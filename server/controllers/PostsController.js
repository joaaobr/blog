const Post = require('../models/Posts')
const Comment = require('../models/Comments')
const User = require('../models/User')

module.exports = {
    async create(req, res) {
        const { email, title, message } = req.body

        if(!email) return res.status(404).json({ message: "Email is not valid!" })
        if(!message) return res.status(404).json({ message: "Message is not valid!" })
        if(!title) return res.status(404).json({ message: "Title is not valid!" })
        
        try {         
            const checkEmail = await User.findOne({ email })
            
            if(!checkEmail) return res.status(404).json({ message: "Email is not valid!" })

            const checkIfTitleOfPostExists = await Post.findOne({ title, name: checkEmail.name })

            if(checkIfTitleOfPostExists) return res.status(404).json({ message: "You have already created a post with this title." })

            const post = await Post.create({
                name: checkEmail.name,
                title,
                message
            })
            
            return res.status(201).json({ message: post })

        } catch(err) {
            return res.status(500).json({ message: err })
        }
    },

    async update(req, res) {
        const { id } = req.params

        if(req.body.email) return res.status(404).json({ message: "It is not valid to send email!" })

        try {
            const post = await Post.findById(id)

            if(!post) return res.status(404).json({ message: "Id is not valid!" })

            const PostToBeUpdate = await Post.findByIdAndUpdate(id, req.body, { now: true })

            return res.status(200).json({ message: PostToBeUpdate })

        } catch(err) {
            return res.status(500).json(err)
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
            return res.status(500).json(err)
        }
    },

    async posts(req, res) {
        try {
            const posts = await Post.find()

            return res.status(200).json({ message: posts })
        } catch(err) {
            return res.status(500).json({ error: err.message })
        }
    },

    async getPost(req, res) {
        const { name, title } = req.body
        
        try {
            const checkPost = await Post.find({ name, title })
    
            if(!checkPost) return res.status(404).json({ message: "Post not exists!" })
            
            return res.status(200).json({ message: checkPost })
        } catch(err) {
            return res.status(500).json({ err })
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
            return res.status(500).json({ err })
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
            return res.status(500).json({ err })
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
            return res.status(500).json({ err })
        }
    }
}