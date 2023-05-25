<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
const menuList = ['ABOUT','PROFILE','CONTACT']
</script>

<template>
  <header>
    <p>Logo</p>
    <Menu :data="menuList" num="3"/>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
