const Comment = require('../models/Comments')
const Post = require('../models/Posts')
const User = require('../models/User')

module.exports = {
    async create (req, res) {
        const { name, email, post_id, message } = req.body

        if(!name) return res.status(404).json({ message: "name is not valid!" })
        if(!email) return res.status(404).json({ message: "email is not valid!" })
        if(!post_id) return res.status(404).json({ message: "post_id is not valid!" })
        if(!message) return res.status(404).json({ message: "message is not valid!" })

        try {
            const verifyEmailUser = await User.findOne({ email })

            if(!verifyEmailUser) return res.status(404).json({ message: "email is not valid!" })

            if(verifyEmailUser.name !== name) return res.status(404).json({ message: "name is not valid!" })

            const verifyPostId = await Post.findById(post_id)

            if(!verifyPostId) return res.status(404).json({ message: "post_id is not valid!" })

            const comment = await Comment.create({
                name, 
                email,
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

            if(verifyPostId) return res.status(404).json({ message: "id is not valid!" })

            const comments = await Comment.find({ post_id: id })

            return res.status(200).json({ message: comments })
        } catch(err) {
            return res.status(500).json(err)
        }

    },

    async comments (req, res) {
        try {
            const comments = await Comment.find()

            return res.status(200).json({ message: comments })
        } catch(err) {
            return res.status(500).json({ error: err.message })
        }
    }


}