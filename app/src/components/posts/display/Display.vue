<template src="./display.html"></template>

<script>
import axios from "../../../axios.config";

export default {
  name: "Auth",
  data() {
    return {
      posts: [],
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    async getPosts() {
      await axios.post('/post')
      .then(data => (this.posts = data.data.message));
    },
  },
};
</script>

<style src="./display.css" scoped></style>
