require('dotenv').config()
const Post = require('../models/Posts')
const Comment = require('../models/Comments')
const User = require('../models/User')
const redis = require('../database/redis')


module.exports = {
    async create(req, res) {
        const { email, title, message } = req.body

        if(!email) return res.status(404).json({ message: "Email is not valid!" })
        if(!message) return res.status(404).json({ message: "Message is not valid!" })
        if(!title) return res.status(404).json({ message: "Title is not valid!" })
        
        try {         
            const verifyIfEmailExists = await User.findOne({ email })
            
            if(!verifyIfEmailExists) return res.status(404).json({ message: "Email is not valid!" })

            const checkIfTitleOfPostExists = await Post.findOne({ title, name: verifyIfEmailExists.name })

            if(checkIfTitleOfPostExists) return res.status(404).json({ message: "You have already created a post with this title." })

            const post = await Post.create({
                name: verifyIfEmailExists.name,
                title,
                message
            })
            
            const cacheKey = "posts"

            const posts = await Post.find()
            .limit(30)
            .exec()

            await redis.set(cacheKey, JSON.stringify(posts), {
                EX: Number(process.env.CACHE_LIFE_TIME),
            })

            return res.status(201).json({ message: post })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async update(req, res) {
        const { id, email } = req.params

        if(email) return res.status(404).json({ message: "It is not valid to send email!" })

        try {
            const post = await Post.findById(id)

            if(!post) return res.status(404).json({ message: "Id is not valid!" })

            const postToBeUpdate = await Post.findByIdAndUpdate(id, req.body, { now: true })

            return res.status(200).json({ message: postToBeUpdate })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async delete(req, res) {
        const { id } = req.params

        try {
            const verifyId = await Post.findById(id)

            if(!verifyId) return res.status(404).json({ message: "Id is not valid!" })

            const post = await Post.findByIdAndDelete(id)

            return res.status(200).json({ message: post })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async posts(req, res) {
        try {
            const cacheKey = "posts"

            const cachedPosts = await redis.get(cacheKey)

            if(cachedPosts) {
                return res
                .status(200)
                .json({ message: JSON.parse(cachedPosts) })
            }

            const posts = await Post.find()
            .limit(30)
            .exec()

            
            await redis.set(cacheKey, JSON.stringify(posts), {
                EX: Number(process.env.CACHE_LIFE_TIME),
            })

            return res.status(200).json({ message: posts })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async getPost(req, res) {
        const { name, title } = req.body
        
        try {
            const checkPost = await Post.find({ name, title })
    
            if(!checkPost) return res.status(404).json({ message: "Post not exists!" })
            
            return res.status(200).json({ message: checkPost })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async getPostsByUser(req, res) {
        const { name } = req.body

        if(!name) return res.status(404).json({ message: "name is not valid!" })

        try {
            const checkPost = await Post.find({ name })

            if(!checkPost) return res.status(404).json({ message: "name is not valid!" })

            return res.status(200).json({ message: checkPost })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }


    },

    async getPostById(req, res) {
        const { id } = req.body

        if(!id) return res.status(404).json({ message: "id is not valid!" })

        try {
            const checkId = await Post.findById(id)
            
            if(!checkId) return res.status(404).json({ message: "id is not valid!" })

            return res.status(200).json({ message: checkId })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    },

    async getPostAndCommentsById(req, res) {
        const { id } = req.body

        if(!id) return res.status(404).json({ message: "id is not valid!" })

        try {
            const checkIfIdIsValid = await Post.findById(id)

            if(!checkIfIdIsValid) return res.status(404).json({ message: "name or title is not valid!" })

            const comments = await Comment.find({ post_id: checkIfIdIsValid._id })
            
            return res.status(200).json({ 
                post: checkIfIdIsValid,
                comments
            })
        } catch(err) {
            return res.status(500).json({ err: "there was an error!" })
        }
    }
}