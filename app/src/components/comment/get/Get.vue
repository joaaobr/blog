<template>
<body>
    <div id="container">
        <p id="title"> Replying to <a id="linkPost" :href="`/post/${name}/${title}`">{{ title }}</a></p>
        <br>

         <p id="name" :style="{width: nameLength * 11 + 'px'}"> <a :href="`/user/${name}`">{{ this.$route.params.name }}</a></p>
         <br>

         <p id="comment">{{ comment }}</p>
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

            nameLength: 0,
            index: this.$route.params.index,
            comment: null,
            idComment: null,
            id: null,
            
        }
    },

    async mounted() {
        await this.GetComment()
        this.nameLength = this.$route.params.name.length
        await this.getDataPost()
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
                console.log(data)
                this.name = data.data.message.name
                this.title = data.data.message.title
            })
            .catch(err => window.location.href = "/")
        }
    }

}
</script>

<style scoped src="./get.css"></style>