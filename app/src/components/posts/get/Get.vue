<template src="./get.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Get",
  data() {
    return {
      nameWidth: this.$route.params.name.length * 11 + "px",
      title: null,
      message: null,
      name: null,
      id: null,
      comments: [],
      replyLink: '/',
      postIsMine: false,
    };
  },

  async mounted() {
    await this.getPost();
    await this.checkIfThePostIsMine();
    await this.getComments();
  },
  
  created() {
    this.setReplyLink()
  },

  methods: {
    async getPost() {
      const data = {
        name: this.$route.params.name,
        title: this.$route.params.title,
      };

      await axios.post('/post/getPost', data)
      .then(data => {
        this.title = data.data.message[0].title;
        this.message = data.data.message[0].message;
        this.name = data.data.message[0].name;
        this.id = data.data.message[0]._id;
      });
    },

    async getComments() {
      await axios.post('/comment/find', { id: this.id }).then(data => this.comments = data.data.message);
    },

    setReplyLink() {
      this.replyLink = `/comment/create/${this.name}/${this.title}`
    },

    async verifyToken() {
      const token = this.getToken();

      if (!token) return;

      const headers = {
        authorization: `Bearer ${token}`,
      };

      await axios.post('/auth/validate', {}, { headers })
        .then(data =>(this.isLogged = `/comment/create/${this.name}/${this.title}`));
    },

    async deletePost() {
      await axios.post(`/post/delete/${this.id}`)
        .then(data => this.message = "Successfully deleted post.")
        .catch(err => alert("There was an error"));
    },

    async checkIfThePostIsMine() {
      const data = {
        token: this.getToken(),
      };

      await axios.post('/user/getUserByToken', data).then((data) => this.postIsMine = data.data.message.name === this.name ? true : false)
    },

    getToken() {
      return window.localStorage.getItem("token");
    },
  },
};
</script>

<style scoped src="./get.css"></style>
