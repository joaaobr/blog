import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Auth from '../views/Auth.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import CreateComment from '../views/CreateComment.vue'
import UserPage from '../views/UserPage.vue'
import ViewComment from '../views/ViewComment.vue'
import UpdateComment from '../views/UpdateComment.vue'
import UpdatePost from '../views/UpdatePost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/post/create',
    name: 'createPost',
    component: CreatePost
  },
  {
    path: '/post/:name/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/comment/create/:name/:title',
    name: 'createComment',
    component: CreateComment
  },
  {
    path: '/user/:name',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/comment/:id',
    name: 'ViewComment',
    component: ViewComment
  },
  {
    path: '/comment/update/:id',
    name: 'UpdateComment',
    component: UpdateComment
  },
  {
    path: '/post/update/:id',
    name: 'UpdatePost',
    component: UpdatePost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
