<template>
<body>
    <div id="container" v-if="fullLoad">
        <p id="title">Replying to <a id="linkPost" :href="`/post/${nameUserOfPost}/${title}`">{{ title }}</a></p>
        <br>
        <p id="name" :style="{width: nameWidth}"> <a :href="`/user/${nameUserOfComment}`">{{ nameUserOfComment }}</a></p>
        <br>
        <p id="comment">{{ comment }}</p>

        <div id="changers" v-if="commentIsMine">
            <br>
            <button id="delete" v-on:click="deleteComment">Delete</button>
            <button id="update"><a :href="`/comment/update/${this.id}`">Update</a></button>
        </div>
    </div>
</body>
</template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Get",
  data() {
    return {
      id:                this.$route.params.id,
      nameUserOfComment: null,
      title:             null,
      comment:           null,
      nameUserOfPost:    null,
      commentIsMine:     false,
      fullLoad:          false,
      nameWidth:         0,
    };
  },

  async mounted() {
    await this.getAllCommentData()
    this.fullLoad = true
    await this.checkIfTheCommentIsMine()
    this.setNameWidth();
  },

  methods: {
    async getAllCommentData() {
      const data = {
        id: this.id,
      };

      await axios.post('/comment/getAllCommentData', data)
        .then(data => {
          this.comment = data.data.comment.message
          this.nameUserOfComment = data.data.comment.name
          this.title = data.data.post.title;
          this.nameUserOfPost = data.data.post.name;
        })
        .catch(err => window.location.href = '/')
    },

    async checkIfTheCommentIsMine() {
        const token = window.localStorage.getItem('token')
        const name = window.localStorage.getItem('__user_data__').name

        return this.commentIsMine = name === this.nameUserOfComment && token ? true : false
    },

    setNameWidth() {
      this.nameWidth = this.nameUserOfComment.length * 11 + "px";
    },

    async deleteComment() {
      await axios.post(`/comment/delete/${this.id}`)
        .then(data => this.comment = "Successfully deleted comment.")
        .catch(err => alert("There was an error"));
    },
  },
};
</script>

<style scoped src="./get.css"></style>
