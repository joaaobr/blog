<template>
    <Navbar></Navbar>
    <CreatePost></CreatePost>
</template>

<script>
import CreatePost from '@/components/posts/create/Create.vue';
import Navbar from '@/components/navbar/Navbar.vue';

export default { 
  name: 'HomeView',
  components: {
    CreatePost,
    Navbar
  }
}
</script>
