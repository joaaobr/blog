require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME } = process.env 

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`)

const PostsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const Post = mongoose.model("posts", PostsSchema)

module.exports = Post