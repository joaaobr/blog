<template>
    <body>
    <div v-if="isLogged">
        <h1>Create comment for the post {{title}} </h1>
        <br>
        <textarea v-model="message" rows="10"></textarea>
        <br>
        <button v-on:click="createComment">Send</button>
    </div>
</body>
</template>

<script>
import axios from 'axios';

export default {
    name: "CreateComment",
    data() {
        return {
            isLogged: false,
            post_id: null,
            message: null,
            title: this.$route.params.title,
            name: this.$route.params.name,
        }
    },

    async mounted() {
        await this.verifyToken()
        await this.getPostData()
    },

    methods: {
        async getPostData() {
            const data = {
                name: this.name,
                title: this.title
            }

            await axios.post("http://localhost:3000/post/getPost", data)
            .then(data => this.post_id = data.data.message[0]._id)
            .catch(err => alert("There was an error"))
        },

        async createComment() {
            const data = {
                name: this.name,
                post_id: this.post_id,
                message: this.message
            }

            await axios.post("http://localhost:3000/comment/create", data)
            .then(data => { 
                alert("Comment created successfully!") 
                window.location.href = `/post/${this.name}/${this.title}`
            })
            .catch(err => window.location.href = '/')
        },

        async verifyToken() {
            const token = this.getToken()

            if(!token) window.location.href = '/auth'

            const headers = {
                authorization: `Bearer ${token}` 
            }

            await axios.post("http://localhost:3000/auth/validate", {}, { headers })
            .then(data => this.isLogged = true)
            .catch(err => window.location.href = '/auth')
        },

        getToken() {
            return window.localStorage.getItem("token")
        }
    }
}
</script>

<style scoped src="./create.css"></style>