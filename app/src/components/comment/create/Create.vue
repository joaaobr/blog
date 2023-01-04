<template src="./create.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "CreateComment",
  data() {
    return {
      isLogged: false,
      post_id: null,
      message: null,
      title: this.$route.params.title,
      name: this.$route.params.name,
      username: null,
    };
  },

  async mounted() {
    await this.verifyToken();
    await this.getUserData();
    await this.getPostData();
  },

  methods: {
    async getUserData() {
      const token = this.getToken();

      await axios
        .post(`/user/getUserByToken`, { token })
        .then((data) => (this.username = data.data.message.name));
    },
    async getPostData() {
      const data = {
        name: this.name,
        title: this.title,
      };

      await axios
        .post(`/post/getPost`, data)
        .then((data) => (this.post_id = data.data.message[0]._id))
        .catch((err) => alert("There was an error"));
    },

    async createComment() {
      const data = {
        name: this.username,
        post_id: this.post_id,
        message: this.message,
      };

      await axios
        .post(`/comment/create`, data)
        .then((data) => {
          alert("Comment created successfully!");
          window.location.href = `/post/${this.name}/${this.title}`;
        })
        .catch((err) => (window.location.href = "/"));
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) this.redirectToAuth();

      const headers = {
        authorization: `Bearer ${token}`,
      };

      await axios
        .post(`/auth/validate`, {}, { headers })
        .then((data) => (this.isLogged = true))
        .catch((err) => this.redirectToAuth());
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    redirectToAuth() {
      window.location.href = "/auth";
    },
  },
};
</script>

<style scoped src="./create.css"></style>
