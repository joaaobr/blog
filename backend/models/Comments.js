require('dotenv').config()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME } = process.env 

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`)

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Comment = mongoose.model("comments", CommentSchema)

module.exports = Comment