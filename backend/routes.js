const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostsController')
const CommentController = require('./controllers/CommentController')

module.exports = (app) => {
    app.post('/user/create', UserController.create)
    
    app.post('/user/delete/:id', UserController.delete)

    app.post('/user/update/:id', UserController.update)

    app.post('/post/create', PostController.create)
    
    app.post('/post/update/:id', PostController.update)

    app.post('/post/delete/:id', PostController.delete)

    app.post('/post', PostController.posts)

    app.post('/comment/create', CommentController.create)

    app.post('/comment/', CommentController.comments)

    app.post('/comment/find/', CommentController.find)
}