const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostsController')
const CommentController = require('./controllers/CommentController')
const AuthController = require('./controllers/AuthController')

module.exports = (app) => {
    app.post('/user/create', UserController.create)
    
    app.post('/user/delete/:id', UserController.delete)

    app.post('/user/update/:id', UserController.update)
    
    app.post('/user/getUserByToken', UserController.getUserByToken)

    app.post('/post/create', PostController.create)
    
    app.post('/post/update/:id', PostController.update)

    app.post('/post/delete/:id', PostController.delete)
    
    app.post('/post/getPost', PostController.getPost)

    app.post('/post/getPostsByUser', PostController.getPostsByUser)

    app.post('/post', PostController.posts)

    app.post('/comment/create', CommentController.create)

    app.post('/comment/delete/:id', CommentController.delete)

    app.post('/comment/update/:id', CommentController.update)

    app.post('/comment/getCommentsByName', CommentController.getCommentsByName)

    app.post('/comment/find/', CommentController.find)

    app.post('/comment/', CommentController.comments)

    app.post('/auth/', AuthController.authenticate)

    app.post('/auth/validate', AuthController.validate)
}