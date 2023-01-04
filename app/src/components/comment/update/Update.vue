<template src="./update.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "CreateComment",
  data() {
    return {
      message: null,
      name: null,
      isLogged: false,
      id: this.$route.params.id,
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
        .post(`/comment/getCommentsById`, data)
        .then((data) => {
          this.id = data.data.message._id;
          this.name = data.data.message.name;
          this.message = data.data.message.message;
        })
        .catch((err) => alert("There was an error"));
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) this.redirectToAuth();

      await axios
        .post(`/user/getUserByToken`, { token })
        .then((data) => {
          if (data.data.message.name === this.name) {
            return (this.isLogged = true);
          }

          this.redirectToHome();
        })
        .catch((err) => this.redirectToAuth());
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    async update() {
      const data = {
        message: this.message,
      };

      await axios
        .post(`/comment/update/${this.id}`, data)
        .then((data) => {
          alert("Comment successfully updated");
          this.redirectToHome();
        })
        .catch((err) => alert("There was an error"));
    },

    redirectToAuth() {
      window.location.href = "/auth";
    },

    redirectToHome() {
      window.location.href = "/";
    },
  },
};
</script>

<style scoped src="./update.css"></style>
