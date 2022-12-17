<template>
  <Navbar></Navbar>
  <Posts></Posts>
</template>

<script>
import Posts from '@/components/Posts.vue';
import Navbar from '@/components/navbar/Navbar.vue';
export default { 
  name: 'HomeView',
  components: {
    Posts,
    Navbar
  }
}
</script>
