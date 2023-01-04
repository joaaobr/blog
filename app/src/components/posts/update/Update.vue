<template src="./update.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "CreateComment",
  data() {
    return {
      isLogged: false,
      message: null,
      id: this.$route.params.id,
      name: null,
      title: null,
    };
  },

  async mounted() {
    await this.getCommentData();
    await this.verifyToken();
  },

  methods: {
    async getCommentData() {
      const data = {
        id: this.id,
      };

      await axios
        .post(`/post/getPostById`, data)
        .then((data) => {
          this.id = data.data.message._id;
          this.name = data.data.message.name;
          this.message = data.data.message.message;
          this.title = data.data.message.title;
        })
        .catch((err) => alert("There was an error"));
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) this.redirectToAuth();

      const data = {
        token,
      };

      await axios
        .post(`/user/getUserByToken`, data)
        .then((data) => {
          if (data.data.message.name === this.name) {
            this.isLogged = true;
          } else {
            this.redirectToAuth();
          }
        })
        .catch((err) => this.redirectToAuth());
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    async update() {
      const data = {
        title: this.title,
        message: this.message,
      };

      await axios
        .post(`/post/update/${this.id}`, data)
        .then((data) => {
          alert("Post successfully updated");
          window.location.href = "/";
        })
        .catch((err) => alert("There was an error"));
    },

    redirectToAuth() {
      window.location.href = "/auth";
    },
  },
};
</script>

<style scoped src="./update.css"></style>
