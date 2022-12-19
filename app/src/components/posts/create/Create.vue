<template>
<body>
  <div>
      <h1>Create new post</h1>
      <br><br>

      <input type="text" v-model="title" placeholder="Title">
      <br><br>

      <textarea id="message" v-model="message"></textarea>
      <br><br>

      <button v-on:click="publish">Publish</button>
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
      email: null
    }
  },

  mounted() {
    this.getEmail()
  },

  methods: {
    async publish() {
      const data = {
        email: this.email,
        title: this.title,
        message: this.message,
      }

      await axios.post("http://localhost:3000/post/create", data)
      .then(data => {
        if(data.data.message) alert("Post created successfully")
      })
      .catch(err => {
          alert("There was an error") 
      })
      
    },

    async getEmail() {
      const token = window.localStorage.getItem("token")

      await axios.post("http://localhost:3000/user/getUserByToken", { token })
      .then(data => {
        if(data.data.message) this.email = data.data.message.email
      })
      .catch(err => {
        window.location.href = "/auth"
      })
    }
  }

}
  </script>
  
  <style src="./create.css" scoped></style>