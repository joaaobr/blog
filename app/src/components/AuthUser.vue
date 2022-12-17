<template>
    <body>
      <div v-if="tokenNotValid">
          <h1>Auth</h1>
  
          <input type="email" placeholder="E-mail" v-model="email">
          <br><br>
  
          <input type="password" placeholder="Password" v-model="password">
          <br><br>
  
          <button v-on:click="register">Send</button>
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
        tokenNotValid: false
      }
    },
    async mounted() {
      const token = window.localStorage.getItem("token")

      if(!token) return this.tokenNotValid = true

      await axios.post("http://localhost:3000/auth/validate", {}, {
        headers: { "authorization": `Bearer ${token}` }
      })
      .then(data => {
        if(data.data.message) window.location.href = '/'
      })
      .catch(err => this.tokenNotValid = true)
    },

    methods: {
      async register() {
        const data = {
          email: this.email,
          password: this.password,
        }
  
        await axios.post("http://localhost:3000/auth/", data)
        .then(data => {
          if(data.data.message) {
            window.localStorage.setItem("token", data.data.message)
            window.location.href = '/'
          }
        })
        .catch(err => {
          if(err.response.status == 404) {
            alert(err.response.data.message)
          } else {
            alert("There was an error") 
          }
        })
        
      }
    }
  
  }
  </script>
  
  <style>@import "../assets/css/register.css"</style>