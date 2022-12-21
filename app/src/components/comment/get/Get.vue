<template>
<body>
    <div id="container">
        <p id="title"> Replying to <a id="linkPost" :href="`/post/${name}/${title}`">{{ title }}</a></p>
        <br>
        <p id="name" :style="{width: nameWidth}"> <a :href="`/user/${name}`">{{ this.$route.params.name }}</a></p>
        <br>
        <p id="comment">{{ comment }}</p>

        <div id="changers" v-if="commentIsMine">
            <br>
            <button id="delete" v-on:click="deleteComment">Delete</button>
            <button id="update"><a :href="`/comment/update/${this.idComment}`">Update</a></button>
        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios'

export default {
    name: "Get",
    data() {
        return{
            name: null,
            title: null,
            commentIsMine: false,
            nameWidth: 0,
            index: this.$route.params.index,
            comment: null,
            idComment: null,
            id: null,
            
        }
    },

    async mounted() {
        this.setNameWidth()
        await this.GetComment()
        await this.getDataPost()
        await this.checkIfTheCommentIsMine()
    },

    methods: {
        async GetComment() {
            const data = {
                name: this.$route.params.name
            }

            await axios.post("http://localhost:3000/comment/getCommentsByName", data)
            .then(data => {
                this.comment = data.data.message[this.index].message
                this.id = data.data.message[this.index].post_id
                this.idComment = data.data.message[this.index]._id
            })
            .catch(err => window.location.href = "/")
        },

        async getDataPost() {
            const data = {
                id: this.id
            }
    
            await axios.post("http://localhost:3000/post/getPostById", data)
            .then(data => {
                this.name = data.data.message.name
                this.title = data.data.message.title
            })
        },

        async checkIfTheCommentIsMine() {
            const data = {
                token: this.getToken()
            }
    
            await axios.post("http://localhost:3000/user/getUserByToken", data)
            .then(data => {
                if(data.data.message.name === this.name) this.commentIsMine = true
            })
        },

        getToken() {
            return window.localStorage.getItem("token")
        },

        setNameWidth() {
            this.nameWidth = this.$route.params.name.length * 11 + 'px'
        },

        async deleteComment() {
            const data = {
                token: this.getToken()
            }
    
            await axios.post(`http://localhost:3000/comment/delete${this.idComment}`)
            .then(data => {
                this.comment = "Successfully deleted comment."
            })
            .catch(err => alert("There was an error"))
        }
    }

}
</script>

<style scoped src="./get.css"></style>