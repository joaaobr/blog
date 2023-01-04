<template src="./create.html"></template>
  
<script>
import axios from 'axios'

export default {
  name: 'Auth',
  data() {
    return {
      title: null,
      message: null,
      email: null,
      isLogged: false
    }
  },

  async mounted() {
    await this.verifyToken()
    await this.getEmail()
  },

  methods: {
    async publish() {
      const data = {
        email: this.email,
        title: this.title,
        message: this.message,
      }

      await axios.post("http://localhost:3000/post/create", data)
      .then(data => alert("Post created successfully"))
      .catch(err => { 
        console.log(err)
        if(err.response.status === 404) {
          return alert(err.response.data.message)
        }

        alert("There was an error") 
    })
    },

    async getEmail() {
      const token = this.getToken()

      await axios.post("http://localhost:3000/user/getUserByToken", { token })
      .then(data => this.email = data.data.message.email)
      .catch(err => this.redirectToAuth())
    },

    async verifyToken() {
        const token = this.getToken()

        if(!token) this.redirectToAuth()

        const headers = {
            authorization: `Bearer ${token}` 
        }

        await axios.post("http://localhost:3000/auth/validate", {}, { headers })
        .then(err => this.isLogged = true)
        .catch(err => this.redirectToAuth())
    },

    getToken() {
      return window.localStorage.getItem("token")
    },

    redirectToAuth() {
      window.location.href = '/auth'
    }
  }

}
  </script>
  
  <style src="./create.css" scoped></style>