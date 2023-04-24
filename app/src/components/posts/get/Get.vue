<template src="./get.html"></template>

<script>
import axios from "../../../axios.config";
import Navbar from "@/components/navbar/Navbar.vue";
import LoadingPage from "@/components/loading-page/LoadingPage.vue";

export default {
  name: "Get",
  components: {
    LoadingPage,
    Navbar
  },
  data() {
    return {
      nameWidth: this.$route.params.name.length * 11 + "px",
      title: null,
      message: null,
      name: null,
      id: null,
      comments: [],
      replyLink: '/auth',
      postIsMine: false,
      fullLoad: false
    };
  },

  async mounted() {
    await this.getAllPostData()
    await this.checkIfThePostIsMine();
    this.setReplyLink()
    setTimeout(() => this.fullLoad = true, 400)
  },

  methods: {
    async getAllPostData() {
      const data = {
        id: this.$route.params.id,
      };

      await axios.post('/post/getPostAndCommentsById', data)
      .then(data => {
        this.title = data.data.post.title
        this.message = data.data.post.message
        this.name = data.data.post.name
        this.id = data.data.post._id
        this.comments = data.data.comments
      })
    },

    setReplyLink() {
      this.replyLink = `/comment/create/${this.name}/${this.title}`
    },

    async deletePost() {
      await axios.post(`/post/delete/${this.id}`)
        .then(data => this.message = "Successfully deleted post.")
        .catch(err => alert("There was an error"));
    },

    async checkIfThePostIsMine() {
      const name = window.localStorage.getItem('__')
      this.postIsMine = name === this.name ? true : false
    }
  },
};
</script>

<style scoped src="./get.css"></style>
