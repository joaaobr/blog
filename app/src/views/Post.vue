<template>
    <Navbar></Navbar>
    <GetPost></GetPost>
  </template>
  
  <script>
  import GetPost from '@/components/posts/get/Get.vue';
  import Navbar from '@/components/navbar/Navbar.vue';
  export default { 
    name: 'HomeView',
    components: {
        GetPost,
      Navbar
    }
  }
  </script>
  