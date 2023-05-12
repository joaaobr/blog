require("dotenv").config()
const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostsController");
const CommentController = require("./controllers/CommentController");
const AuthController = require("./controllers/AuthController");
const Router = require("express").Router();

Router.post("/user/create", UserController.create);

Router.post("/user/delete/:id", UserController.delete);

Router.post("/user/update/:id", UserController.update);

Router.post("/user/getUserByToken", UserController.getUserByToken);

Router.post("/user/allUsers", UserController.getAllUsers);

Router.post("/user/getAllUserDataByName", UserController.getAllUserDataByName);

Router.post("/post/create", PostController.create);

Router.post("/post/update/:id", PostController.update);

Router.post("/post/delete/:id", PostController.delete);

Router.post("/post/getPost", PostController.getPost);

Router.post("/post/getPostsByUser", PostController.getPostsByUser);

Router.post("/post/getPostById", PostController.getPostById);

Router.post("/post/getPostAndCommentsById", PostController.getPostAndCommentsById);

Router.post("/post", PostController.posts);

Router.post("/comment/create", CommentController.create);

Router.post("/comment/delete/:id", CommentController.delete);

Router.post("/comment/update/:id", CommentController.update);

Router.post("/comment/getCommentsByName", CommentController.getCommentsByName);

Router.post("/comment/getCommentsById", CommentController.getCommentById);

Router.post("/comment/getAllCommentData", CommentController.getAllCommentData);

Router.post("/comment/find/", CommentController.find);

Router.post("/comment/", CommentController.comments);

Router.post("/auth/", AuthController.authenticate);

Router.post("/auth/validate", AuthController.validate);

Router.get('/', (req, res) => res.json({ }))

module.exports = Router