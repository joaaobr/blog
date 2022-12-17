<template src="./posts.html"></template>

<script>
import axios from 'axios'

export default {
name: 'Auth',
data() {
    return {
        posts: []
    }
},

mounted() {
    this.getPosts() 
},

methods: {
    async getPosts() {
        await axios.post("http://localhost:3000/post")
        .then(data => {
            if(data.data.message) this.posts = data.data.message
        })
    }
}
}
</script>

<style src="./posts.css" scoped></style>