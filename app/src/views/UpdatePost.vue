<template>
    <Navbar></Navbar>
    <UpdatePost></UpdatePost>
</template>
  
<script>
import UpdatePost from '@/components/posts/update/Update.vue';
import Navbar from '@/components/navbar/Navbar.vue';

export default { 
    name: 'UserPage',
    components: {
        UpdatePost,
        Navbar
    }
}
</script>
  