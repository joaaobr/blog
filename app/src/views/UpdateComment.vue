<template>
    <Navbar></Navbar>
    <UpdateComment></UpdateComment>
  </template>
  
  <script>
  import UpdateComment from '@/components/comment/update/Update.vue';
  import Navbar from '@/components/navbar/Navbar.vue';
  
  export default { 
  name: 'UserPage',
  components: {
    UpdateComment,
    Navbar
  }
  }
  </script>
  