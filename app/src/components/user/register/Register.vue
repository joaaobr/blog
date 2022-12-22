<template src="./register.html"></template>

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
      .then(data => alert("Account created successfully"))
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

<style src="./register.css" scoped></style>