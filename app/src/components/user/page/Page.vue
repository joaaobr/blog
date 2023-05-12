<template src="./page.html"></template>

<script>
import axios from "../../../axios.config";
import LoadingPage from "@/components/loading-page/LoadingPage.vue";

export default {
  name: "Page",
  data() {
    return {
      name: this.$route.params.name,
      posts: false,
      comments: false,
      fullLoad: false
    };
  },

  components: {
    LoadingPage
  },

  async mounted() {
    await this.getAllUserData()
    setTimeout(() => this.fullLoad = true, 500)
  },

  methods: {
    async getAllUserData() {
      const data = {
        name: this.name,
      };

      axios.post('user/getAllUserDataByName', data)
      .then(data => {
        this.posts = data.data.posts
        this.comments = data.data.comments
      })
      .catch(err => window.location.href = "/")
    },
  },
};
</script>

<style scoped src="./page.css"></style>
