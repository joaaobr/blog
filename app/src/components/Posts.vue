<template>
    <body>
        <div>
            <a v-for="post in posts" :key="post" href="">{{post.title}}</a>
            
        </div>
    </body>
</template>

<script>
import axios from 'axios'

export default {
name: 'Auth',
data() {
    return {
        posts: []
    }
},

async mounted() {
    await axios.post("http://localhost:3000/post")
    .then(data => {
        if(data.data.message) this.posts = data.data.message
    })
}
}
</script>

<style src="../assets/css/posts.css" scoped></style>