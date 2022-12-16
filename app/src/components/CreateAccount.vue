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
    
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      console.log(data)
      fetch("http://localhost:3000/user/create", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })
      .then(data => {
        if (data.status === 404) window.alert("There was an error!")
      })
      .catch(err => window.alert("There was an error!"))
    }
  }

}
</script>

<style scoped>
  body {
      font-family: Arial, Helvetica, sans-serif;
  }

  div {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 100px;
  }

  input {
      padding: 17px;
      border: none;
      outline: none;
      font-size: 15px;
      border: 1px solid rgb(226, 219, 219);
      border-radius: 2px;
  }

  button {
      background-color: dodgerblue;
      border: none;
      padding: 17px;
      width: 100%;
      border-radius: 10px;
      color: white;
      font-size: 15px;
      
  }

  button:hover {
      background-color: deepskyblue;
      cursor: pointer;
  }
</style>