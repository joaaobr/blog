<template src="./auth.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Auth",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      isLogged: false,
    };
  },

  async mounted() {
    await this.validateToken();
  },

  methods: {
    async auth() {
      const data = {
        email: this.email,
        password: this.password,
      };

      await axios.post('/auth/', data)
        .then(data => {
          window.localStorage.setItem("token", data.data.message);
          this.redirectToHome();
        })
        .catch(err => {
          if (err.response.status == 404) {
            alert(err.response.data.message);
          } else {
            alert("There was an error");
          }
        });
    },

    async validateToken() {
      const token = window.localStorage.getItem("token");

      if (!token) return (this.isLogged = true);

      const headers = {
        authorization: `Bearer ${token}`,
      };

      await axios.post('/auth/validate', {}, { headers })
        .then(data => this.redirectToHome())
        .catch(err => this.isLogged = true)
    },

    redirectToHome() {
      window.location.href = "/";
    },
  },
};
</script>

<style scoped src="./auth.css"></style>
