<template src="./get.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Get",
  data() {
    return {
      nameUserOfComment: null,
      title: null,
      comment: null,
      idComment: null,
      id: null,
      nameUserOfPost: null,
      commentIsMine: false,
      nameWidth: 0,
      index: this.$route.params.index,
    };
  },

  async mounted() {
    this.setNameWidth();
    await this.GetComment();
    await this.getDataPost();
    await this.checkIfTheCommentIsMine();
  },

  methods: {
    async GetComment() {
      const data = {
        name: this.$route.params.name,
      };

      await axios
        .post(`/comment/getCommentsByName`, data)
        .then((data) => {
          this.comment = data.data.message[this.index].message;
          this.id = data.data.message[this.index].post_id;
          this.idComment = data.data.message[this.index]._id;
          this.nameUserOfComment = data.data.message[this.index].name;
        })
        .catch((err) => (window.location.href = "/"));
    },

    async getDataPost() {
      const data = {
        id: this.id,
      };

      await axios.post(`/post/getPostById`, data).then((data) => {
        this.title = data.data.message.title;
        this.nameUserOfPost = data.data.message.name;
      });
    },

    async checkIfTheCommentIsMine() {
      const data = {
        token: this.getToken(),
      };

      await axios.post(`/user/getUserByToken`, data).then((data) => {
        if (data.data.message.name === this.nameUserOfComment)
          this.commentIsMine = true;
      });
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    setNameWidth() {
      this.nameWidth = this.$route.params.name.length * 11 + "px";
    },

    async deleteComment() {
      await axios
        .post(`/comment/delete/${this.idComment}`)
        .then((data) => (this.comment = "Successfully deleted comment."))
        .catch((err) => alert("There was an error"));
    },
  },
};
</script>

<style scoped src="./get.css"></style>
