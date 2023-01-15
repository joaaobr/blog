<template>
<body>
    <div v-if="isLogged">
        <textarea v-model="message" rows="10"></textarea>
        <br>
        <button v-on:click="createComment">Send</button>
    </div>
</body>
</template>

<script>
import axios from "../../../axios.config";

export default {
  name: "CreateComment",
  data() {
    return {
      title: this.$route.params.title,
      name:  this.$route.params.name,
      post_id:  null,
      message:  null,
      username: null,
      isLogged: false
    };
  },

  async mounted() {
    await this.getUserData();
    await this.getPostData();
  },

  methods: {
    async getUserData() {
      const token = this.getToken();

      if(!token) this.redirectToAuth()

      await axios.post('/user/getUserByToken', { token })
        .then(data => {
          this.username = data.data.message.name
          this.isLogged = true
        })
        .catch(err => this.redirectToAuth())
    },
    async getPostData() {
      const data = {
        name: this.name,
        title: this.title,
      };

      await axios.post('/post/getPost', data)
        .then(data => this.post_id = data.data.message[0]._id)
        .catch(err => alert("There was an error"));
    },

    async createComment() {
      const data = {
        name: this.username,
        post_id: this.post_id,
        message: this.message,
      };

      await axios.post('/comment/create', data)
        .then(data => {
          alert("Comment created successfully!");
          window.location.href = `/post/${this.name}/${this.title}`;
        })
        .catch(err => window.location.href = "/")
    },

    getToken() {
      return window.localStorage.getItem("token");
    },

    redirectToAuth() {
      return window.location.href = '/auth'
    },
  },
};
</script>

<style scoped src="./create.css"></style>
