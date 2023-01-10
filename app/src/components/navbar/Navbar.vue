<template>
<body>
  <header>
      <nav>
          <a v-if="fullLoad" class="logo" href="/">Blog</a>

          <ul v-if="isLogged && fullLoad" class="nav-list">
              <li><a href="/post/create">Create new post</a></li>
              <li><a :href="`/user/${name}`">{{name}}</a></li>
              <li><button v-on:click="logout">Logout</button></li>
          </ul>

          <ul v-if="!isLogged && fullLoad" class="nav-list">
              <li><a href="/register">Register</a></li>
              <li><a href="/auth">Auth</a></li>
          </ul>
      </nav>
  </header>
</body>
</template>

<script>
import axios from "../../axios.config";

export default {
  name: "Navbar",
  data() {
    return {
      name: null,
      id: null,
      isLogged: false,
      fullLoad: false
    };
  },

  async mounted() {
    await this.verifyToken();
    await this.getUserData();
    this.fullLoad = true
  },

  methods: {
    async getUserData() {
      const token = this.getToken();

      await axios.post(`/user/getUserByToken`, { token }).then((data) => {
        this.name = data.data.message.name;
        this.id = data.data.message._id;
      });
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) return (this.isLogged = false);

      const headers = {
        authorization: `Bearer ${token}`,
      };

      await axios
        .post(`/auth/validate`, {}, { headers })
        .then((data) => (this.isLogged = true))
        .catch((err) => (this.isLogged = false));
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    logout() {
      window.localStorage.removeItem("token");
      window.location.reload();
    },
  },
};
</script>

<style scoped src="./navbar.css"></style>
