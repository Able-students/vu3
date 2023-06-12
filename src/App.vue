<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';

const menuList = [{name:'Home', path: '/'},{name: 'Counter', path: '/counter'},{name: 'Contacts', path: "/contacts"},{name: 'ChatGpt', path: "/gpt"}]

</script>

<template>
  <header>
    <p>Logo</p>
    <Menu :data="menuList" num="3" />
  </header>
  <RouterView />
</template>

<style scoped>

</style>
