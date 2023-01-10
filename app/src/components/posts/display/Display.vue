<template>
<body>
  <div>
      <a v-for="post in posts" :key="post" :href="`/post/${post.name}/${post.title}`">{{post.title}}<br></a>
  </div>
</body>
</template>

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
