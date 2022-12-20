<template>
  <body>
    <div v-if="isLogged">
        <h1>Auth</h1>
        <br>
        <input type="email" placeholder="E-mail" v-model="email">
        <br><br>
        <input type="password" placeholder="Password" v-model="password">
        <br><br>
        <button v-on:click="auth">Send</button>
    </div>
</body>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Auth',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      isLogged: false
    }
  },

  mounted() {
    this.validateToken()
  },

  methods: {
    async auth() {
      const data = {
        email: this.email,
        password: this.password,
      }

      await axios.post("http://localhost:3000/auth/", data)
      .then(data => {
          window.localStorage.setItem("token", data.data.message)
          window.location.href = '/'
      })
      .catch(err => {
        if(err.response.status == 404) {
          alert(err.response.data.message)
        } else {
          alert("There was an error") 
        }
      })
      
    },

    async validateToken() {
      const token = this.getToken()

      if(!token) return this.isLogged = true

      const headers = {
        authorization: `Bearer ${token}` 
      }
  
      await axios.post("http://localhost:3000/auth/validate", {}, { headers })
      .then(data => window.location.href = '/')
      .catch(err => this.isLogged = true)
    },
  
    getToken() {
      return window.localStorage.getItem("token")
    }
  }


}
</script>

<style scoped src="./auth.css"></style>