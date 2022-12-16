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

      const myHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST"
      }

      const options = {
        method: "POST",
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data),
        headers: myHeaders
    }

      const v = await axios.post("http://localhost:3000/user/create",data)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        if(err.response.status == 404) {
          window.alert(err.response.data.message)
        } else {
          if(err) window.alert("There was an error") 
        }
        })
      
    }
  }

}
</script>

<style>@import "../assets/css/register.css"</style>