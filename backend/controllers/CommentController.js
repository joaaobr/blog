const Comment = require('../models/Comments')
const Post = require('../models/Posts')
const User = require('../models/User')

module.exports = {
    async create (req, res) {
        const { user_id, post_id, message } = req.body

        if(!user_id) return res.status(404).json({ message: "user_id is not valid!" })
        if(!post_id) return res.status(404).json({ message: "post_id is not valid!" })
        if(!message) return res.status(404).json({ message: "message is not valid!" })

        try {
            const verifyUserId = await User.findById(user_id)

            if(!verifyUserId) return res.status(404).json({ message: "user_id is not valid!" })

            const verifyPostId = await Post.findById(post_id)

            if(!verifyPostId) return res.status(404).json({ message: "post_id is not valid!" })

            const comment = await Comment.create({
                user_id: verifyUserId._id,
                post_id: verifyPostId._id,
                message
            })

            return res.status(201).json({ message: comment })
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}