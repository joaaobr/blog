import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Register from '../views/Register.vue'
import Auth from '../views/Auth.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import CreateComment from '../views/CreateComment.vue'
import UserPage from '../views/UserPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/post/:name/:title',
    name: 'post',
    component: Post
  },
  {
    path: '/comment/:name/:title',
    name: 'comment',
    component: CreateComment
  },
  {
    path: '/user/:name',
    name: 'UserPage',
    component: UserPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
