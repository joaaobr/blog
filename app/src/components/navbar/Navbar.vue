<template src="./navbar.html"></template>

<script>
import axios from 'axios'

export default {
    name: 'Navbar',
    data() {
        return {
            name: null,
            id: null
        }
    },

    mounted() {
        this.getUserData()
    },

    methods: {
        async getUserData() {
            const token = this.getToken()

            await axios.post("http://localhost:3000/user/getUserByToken", { token })
            .then(data => {
                this.name = data.data.message.name
                this.id = data.data.message._id
            })
            .catch(err => window.location.href = "/auth")
        },

        getToken() {
            return window.localStorage.getItem("token")
        }
    }
}
</script>

<style scoped src="./navbar.css"></style>