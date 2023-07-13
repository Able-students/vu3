<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';

const menuList = [
  {name:'Calculator', path: '/'},
  {name: 'Counter', path: '/counter'},
  {name: 'Contacts', path: "/contacts"},
  {name: 'QR', path: "/qr"}
]

</script>

<template>
  <header>
    <img class="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png" alt="">
    <Menu :data="menuList" num="3" />
  </header>
  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped>
.img {
  width: 40px;
  height: 40px;
  margin-left: 20px;
}
body {
  font-family:Arial, Helvetica, sans-serif;
}
.view {
  padding: 20px;
}
</style>
