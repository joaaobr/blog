<template src="./getPost.html"></template>

<script>
import axios from 'axios'

export default {
    name: "GetPost",
    data() {
        return {
            title: null,
            message: null,
            name: null,
            nameWidth: 0,
            titleWidth: 0,
            id: null,
            comments: [],
            replyLink: "/auth"
        }
    },

    async mounted() {
        await this.getPost()
        await this.getComments()
        await this.setReplyLink()
        this.setNameWidth()
        this.setTitleWidth()
        
    },

    methods: {
        async getPost() {
            const data = {
                name: this.$route.params.name,
                title: this.$route.params.title
            }

            await axios.post("http://localhost:3000/post/getPost", data)
            .then(data => {
                this.title = data.data.message[0].title
                this.message = data.data.message[0].message
                this.name = data.data.message[0].name
                this.id = data.data.message[0]._id
            })

        },
        async getComments() {
            await axios.post("http://localhost:3000/comment/find", { id: this.id })
            .then(data => {
                this.comments = data.data.message
            })
        },

        setNameWidth() {
            this.nameWidth = this.name.length * 11 + 'px'
        },

        setTitleWidth() {
            this.titleWidth = this.title.length * 11 + 'px'
        },

        async setReplyLink() {
            const token = this.getToken()

            if(!token) this.replyLink = "/auth"

            const headers = {
                authorization: `Bearer ${token}` 
            }

            await axios.post("http://localhost:3000/auth/validate", {}, { headers })
            .then(err => this.replyLink = `/comment/create/${this.name}/${this.title}`)
        },

        getToken() {
            return window.localStorage.getItem("token")
        }
    }

}
</script>

<style scoped src="./getPost.css"></style>