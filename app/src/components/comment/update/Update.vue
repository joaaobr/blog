<template>
    <body>
    <div v-if="isLogged">
        <h1>Update comment</h1>
        <br>
        <textarea v-model="message" rows="10"></textarea>
        <br>
        <button v-on:click="update">Update</button>
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
            message: null,
            id: this.$route.params.id,
            name: null
        }
    },

    async mounted() {
        await this.getCommentData()
        await this.verifyToken()

    },

    methods: {
        async getCommentData() {
            const data = {
                id: this.id
            }

            await axios.post("http://localhost:3000/comment/getCommentsById", data)
            .then(data => {
                this.id = data.data.message._id 
                this.name = data.data.message.name 
                this.message = data.data.message.message
            })
            .catch(err => alert("There was an error"))
        },

        async verifyToken() {
            const token = this.getToken()

            if(!token) window.location.href = '/auth'

            const headers = {
                authorization: `Bearer ${token}` 
            }

            await axios.post("http://localhost:3000/user/getUserByToken", { token })
            .then(data => {
                if (data.data.message.name === this.name) {
                    this.isLogged = true
                } else {
                    window.location.href = '/auth'
                }
            })
            .catch(err => window.location.href = '/auth')
        },

        getToken() {
            return window.localStorage.getItem("token")
        },

        async update() {
            const data = {
                message: this.message
            }

            await axios.post(`http://localhost:3000/comment/update/${this.id}`, data)
            .then(data => {
                alert("Comment successfully updated")
                window.location.href = '/'
            })
            .catch(err => alert("There was an error"))
        }
    }
}
</script>

<style scoped src="./update.css"></style>