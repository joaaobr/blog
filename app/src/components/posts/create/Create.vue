<template>
<body>
  <div v-if="isLogged">
      <h1>Create new post</h1>
      <br><br>
      <input type="text" v-model="title" placeholder="Title">
      <br><br>
      <textarea id="message" v-model="message"></textarea>
      <br><br>
      <button :click="publish">Publish</button>
  </div>
</body>
</template>
  
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
      .catch(err => alert("There was an error") )
    },

    async getEmail() {
      const token = this.getToken()

      await axios.post("http://localhost:3000/user/getUserByToken", { token })
      .then(data => this.email = data.data.message.email)
      .catch(err => window.location.href = "/auth")
    },

    async verifyToken() {
        const token = this.getToken()

        if(!token) window.location.href = '/auth'

        const headers = {
            authorization: `Bearer ${token}` 
        }

        await axios.post("http://localhost:3000/auth/validate", {}, { headers })
        .then(err => this.isLogged = true)
        .catch(err => window.location.href = '/auth')
    },

    getToken() {
      return window.localStorage.getItem("token")
    }
  }

}
  </script>
  
  <style src="./create.css" scoped></style>