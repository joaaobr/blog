<template>
    <Navbar></Navbar>
    <CreateComment></CreateComment>
</template>

<script>
import CreateComment from '@/components/comment/create/Create.vue';
import Navbar from '@/components/navbar/Navbar.vue';

export default { 
  name: 'HomeView',
  components: {
    CreateComment,
    Navbar
  }
}
</script>
