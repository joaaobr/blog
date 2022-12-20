<template>
    <Navbar></Navbar>
    <GetComment></GetComment>
  </template>
  
  <script>
  import GetComment from '@/components/comment/get/Get.vue';
  import Navbar from '@/components/navbar/Navbar.vue';
  
  export default { 
  name: 'UserPage',
  components: {
    GetComment,
    Navbar
  }
  }
  </script>
  