const Comment = require('../models/Comments')
const Post = require('../models/Posts')
const User = require('../models/User')

module.exports = {
    async create(req, res) {
        const { name, post_id, message } = req.body

        if(!name) return res.status(404).json({ message: "name is not valid!" })
        if(!post_id) return res.status(404).json({ message: "post_id is not valid!" })
        if(!message) return res.status(404).json({ message: "message is not valid!" })

        try {
            const verifyNameUser = await User.findOne({ name })

            if(!verifyNameUser) return res.status(404).json({ message: "name is not valid!" })

            const verifyPostId = await Post.findById(post_id)

            if(!verifyPostId) return res.status(404).json({ message: "post_id is not valid!" })

            const comment = await Comment.create({
                name,
                post_id: verifyPostId._id,
                message
            })

            return res.status(201).json({ message: comment })
        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async find(req, res) {
        const { id } = req.body

        if(!id) return res.status(404).json({ message: "id is not valid!" })

        try {
            const verifyPostId = await Post.findById(id)

            if(!verifyPostId) return res.status(404).json({ message: "id is not valid!" })

            const comments = await Comment.find({ post_id: id })

            return res.status(200).json({ message: comments })
        } catch(err) {
            return res.status(500).json(err)
        }

    },


    async delete(req, res) {
        const { id } = req.params

        try {
            const verifyId = await Comment.findById(id)

            if(!verifyId) return res.status(404).json({ message: "Id is not valid!" })

            const comment = await Comment.findByIdAndDelete(id)

            return res.status(200).json({ message: comment })

        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async update(req, res) {
        const { id } = req.params

        try {
            const verifyid = await Comment.findById(id)

            if(!verifyid) return res.status(404).json({ message: "Id is not valid!" })

            const comment = await Comment.findByIdAndUpdate(id, req.body, { now: true })

            return res.status(200).json({ message: comment })

        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async comments(req, res) {
        try {
            const comments = await Comment.find()

            return res.status(200).json({ message: comments })
        } catch(err) {
            return res.status(500).json({ error: err.message })
        }
    },

    async getCommentsByName(req, res) {
        const { name } = req.body

        if(!name) return res.status(404).json({ message: "name is not valid!" })

        try {
            const checkName = await Comment.find({ name })

            if(!checkName) return res.status(404).json({ message: "name is not valid!" })

            return res.status(200).json({ message: checkName })
        } catch(err) {
            return res.status(500).json({ err })
        }

    },

    async getCommentById(req, res) {
        const { id } = req.body

        if(!id) return res.status(404).json({ message: "id is not valid!" })

        try {
            const checkId = await Comment.findById(id)

            if(!checkId) return res.status(404).json({ message: "id is not valid!" })

            return res.status(200).json({ message: checkId })
        } catch(err) {
            return res.status(500).json({ err })
        }

    },

    async getAllCommentData(req, res) {
        const { id } = req.body

        if(!id) return res.status(404).json({ message: "id is not valid!" })

        try {
            const checkIfIdIsValid = await Comment.findById(id)

            if(!checkIfIdIsValid) return res.status(404).json({ message: "id is not valid!" })

            const post = await Post.findById(checkIfIdIsValid.post_id.toString())

            return res.status(200).json({ 
                comment: checkIfIdIsValid,
                post
            })
        } catch(err) {
            return res.status(500).json({ err })
        }
    }
}