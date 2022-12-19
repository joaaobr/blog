<template>
  <Navbar></Navbar>
  <Page></Page>
</template>

<script>
import Page from '@/components/user/page/Page.vue';
import Navbar from '@/components/navbar/Navbar.vue';

export default { 
name: 'UserPage',
components: {
  Page,
  Navbar
}
}
</script>
