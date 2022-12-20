<template>
    <body>
        <div id="container">
            <h1>{{ name }}</h1>
            <br>
            <hr>
            <br>

            <h2>Posts</h2>
            <li v-for="(post, index) in posts" :key="post">
                <br>
                <a :href="`/post/${post.name}/${post.title}`">{{index+1}}.{{post.title}}</a>
            </li> 

            <br>
            <h2>Comments</h2>
            <li v-for="(comment, index) in comments" :key="comment">
                <br>
                <a :href="`/comment/${comment.name}/${index}`">{{index+1}}.{{comment.message}}</a>
            </li> 
        </div>
    </body>
</template>

<script>
import axios from 'axios'

export default {
    name: "Page",
    data() {
        return {
            name: this.$route.params.name,
            posts: [],
            comments: []
        }
    },

    mounted() {
        this.getPosts()
        this.getComments()
    },

    methods: {
        async getPosts() {
            const data = {
                name: this.name
            }

            await axios.post("http://localhost:3000/post/getPostsByUser", data)
            .then(data => this.posts = data.data.message)
            .catch(err => window.location.href = "/")
        },

        async getComments() {
            const data = {
                name: this.name
            }

            await axios.post("http://localhost:3000/comment/getCommentsByName", data)
            .then(data => this.comments = data.data.message)
            .catch(err => window.location.href = "/")
        }
    }
}
</script>

<style scoped src="./userPage.css"></style>