<template>
  <Navbar></Navbar>
  <Posts></Posts>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';
import Posts from '@/components/posts/display/Display.vue';

export default { 
  name: 'HomeView',
  components: {
    Posts,
    Navbar
  }
}
</script>
