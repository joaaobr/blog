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
            const token = window.localStorage.getItem("token")

            await axios.post("http://localhost:3000/user/getUserByToken", { token })
            .then(data => {
                console.log(data)
                this.name = data.data.message.name
                this.id = data.data.message._id
            })
            .catch(err => {
                window.location.href = "/auth"
            })
        }
    }
}
</script>

<style scoped src="./navbar.css"></style>