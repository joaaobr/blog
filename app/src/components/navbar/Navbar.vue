<template>
<body>
  <header>
      <nav>   
          <router-link v-if="fullLoad" class="logo" to="/"> Blog </router-link>
          <ul v-if="isLogged && fullLoad" class="nav-list">
              <li><router-link to="/post/create">Create new post</router-link></li>
              <li><router-link :to="`/user/${name}`">{{ name }}</router-link></li>
              <li><button v-on:click="logout">Logout</button></li>
          </ul>

          <ul v-if="!isLogged && fullLoad" class="nav-list">
              <li><router-link to="/register">Register</router-link></li>
              <li><router-link to="/auth">Auth</router-link></li>
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
      name:     null,
      id:       null,
      isLogged: false,
      fullLoad: false
    };
  },

  async mounted() {
    await this.getUserData();
    this.fullLoad = true
  },

  methods: {
    async getUserData() {
      const token = window.localStorage.getItem("token");

      if(!token) return
        

      await axios.post('/user/getUserByToken', { token })
      .then(data => {
        this.isLogged = true
        this.name = data.data.message.name
        window.localStorage.setItem('__', data.data.message.name)
      })
      .catch(err => { return })
    },

    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('__')
      window.location.reload();
    },
  },
};
</script>

<style scoped src="./navbar.css"></style>