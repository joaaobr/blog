<template src="./page.html"></template>

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

    async mounted() {
        await this.getPosts()
        await this.getComments()
    },

    methods: {
        async getPosts() {
            const data = {
                name: this.name
            }

            await axios.post("http://localhost:3000/post/getPostsByUser", data)
            .then(data => this.posts = data.data.message)
            .catch(err => this.redirectToHome())
        },

        async getComments() {
            const data = {
                name: this.name
            }

            await axios.post("http://localhost:3000/comment/getCommentsByName", data)
            .then(data => this.comments = data.data.message)
            .catch(err => this.redirectToHome())
        },

        redirectToHome() {
            window.location.href = "/"
        }
    }
}
</script>

<style scoped src="./userPage.css"></style>