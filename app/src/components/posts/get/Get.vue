<template src="./get.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Get",
  data() {
    return {
      title: null,
      message: null,
      name: null,
      id: null,
      nameWidth: 0,
      titleWidth: 0,
      comments: [],
      replyLink: "/auth",
      postIsMine: false,
    };
  },

  async mounted() {
    await this.getPost();
    await this.getComments();
    await this.setReplyLink();
    await this.checkIfThePostIsMine();
    this.setNameWidth();
    this.setTitleWidth();
  },

  methods: {
    async getPost() {
      const data = {
        name: this.$route.params.name,
        title: this.$route.params.title,
      };

      await axios.post(`/post/getPost`, data).then((data) => {
        this.title = data.data.message[0].title;
        this.message = data.data.message[0].message;
        this.name = data.data.message[0].name;
        this.id = data.data.message[0]._id;
      });
    },
    async getComments() {
      await axios.post(`/comment/find`, { id: this.id }).then((data) => {
        this.comments = data.data.message;
      });
    },

    setNameWidth() {
      this.nameWidth = this.name.length * 11 + "px";
    },

    setTitleWidth() {
      this.titleWidth = this.title.length * 11 + "px";
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) return;

      const headers = {
        authorization: `Bearer ${token}`,
      };

      await axios
        .post(`/auth/validate`, {}, { headers })
        .then(
          (data) =>
            (this.isLogged = `/comment/create/${this.name}/${this.title}`)
        );
    },

    async setReplyLink() {
      const token = this.getToken();

      if (!token) return;

      const headers = {
        authorization: `Bearer ${token}`,
      };
      await axios
        .post(`/auth/validate`, {}, { headers })
        .then(
          (err) =>
            (this.replyLink = `/comment/create/${this.name}/${this.title}`)
        );
    },

    async deletePost() {
      await axios
        .post(`/post/delete/${this.id}`)
        .then((data) => {
          this.message = "Successfully deleted post.";
        })
        .catch((err) => alert("There was an error"));
    },

    async checkIfThePostIsMine() {
      const data = {
        token: this.getToken(),
      };

      await axios.post(`/user/getUserByToken`, data).then((data) => {
        if (data.data.message.name === this.name) this.postIsMine = true;
      });
    },

    getToken() {
      return window.localStorage.getItem("token");
    },
  },
};
</script>

<style scoped src="./get.css"></style>
