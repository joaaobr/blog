<template>
  <body>
    <div>
        <h1>Register</h1>
        
        <input type="text" placeholder="Name" v-model="name">
        <br><br>

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
      password: null
    }
  },
  methods: {
    
    async register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      await axios.post("http://localhost:3000/user/create", data)
      .then(data => {
        if(data.data.message) alert("Account created successfully")
      })
      .catch(err => {
        if(err.response.status == 404) {
          window.alert(err.response.data.message)
        } else {
          if(err) alert("There was an error") 
        }
        })
      
    }
  }

}
</script>

<style src="../assets/css/register.css" scoped></style>