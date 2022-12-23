<template src="./navbar.html"></template>

<script>
import axios from 'axios'

export default {
    name: 'Navbar',
    data() {
        return {
            name: null,
            id: null,
            isLogged: false
        }
    },

    async mounted() {
        await this.verifyToken()
        await this.getUserData()
    },

    methods: {
        async getUserData() {
            const token = this.getToken()

            await axios.post("http://localhost:3000/user/getUserByToken", { token })
            .then(data => {
                this.name = data.data.message.name
                this.id = data.data.message._id
            })
        },

        async verifyToken() {
            const token = this.getToken()

            if(!token) return this.isLogged = false

            const headers = {
                authorization: `Bearer ${token}` 
            }
        
            await axios.post("http://localhost:3000/auth/validate", {}, { headers })
            .then(data => this.isLogged = true)
            .catch(err => this.isLogged = false)
        },

        getToken() {
            return window.localStorage.getItem("token")
        },

        logout() {
            window.localStorage.removeItem("token")
            window.location.reload()
        }
    }
}
</script>

<style scoped src="./navbar.css"></style>