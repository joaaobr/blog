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
            nameLength: 0,
            titleLength: 0,
            id: null,
            comments: []
        }
    },

    async mounted() {
        await this.getPost()
        await this.getComments()
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

                this.nameLength = data.data.message[0].name.length
                this.titleLength = data.data.message[0].title.length
            })

        },
        async getComments() {
            await axios.post("http://localhost:3000/comment/find", { id: this.id })
            .then(data => {
                this.comments = data.data.message
            })
        }
    }

}
</script>

<style scoped src="./getPost.css"></style>