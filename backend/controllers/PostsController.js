const Post = require('../models/Posts')
const User = require('../models/User')

module.exports = {
    async create(req, res) {
        const { email, title, message } = req.body

        if(!email) return res.status(404).json({ message: "email is not valid!" })
        if(!message) return res.status(404).json({ message: "message is not valid!" })
        if(!title) return res.status(404).json({ message: "title is not valid!" })
        
        try {
            
            const checkEmail = await User.findOne({ email })
    
            if(!checkEmail) return res.status(404).json({ message: "email is not valid!" })

            const post = await Post.create({
                name: checkEmail.name,
                email,
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

    async posts(req, res) {
        try {
            const posts = await Post.find()

            return res.status(200).json({ message: posts })
        } catch(err) {
            return res.status(500).json({ error: err.message })
        }
    }
}