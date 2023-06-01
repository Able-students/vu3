<template lang="">
    <nav>
        <span v-for="item in data" @click="router.push(item.path)" :class="item.path === path ? 'active' : ''">{{item.name}}</span>
    </nav>
    <h2>{{powerNum}}</h2>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue'
   const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    num: {
        type: Number,
    }
   })
   const router = useRouter();
   const route=useRoute();
   const path = computed(() =>route.path)
   console.log(path.value);
   const menuList = ref(props.data)
   const powerNum = computed(() => props.num ** props.num)
</script>
<style scoped>
    span {
        margin: 0 10px;
    }
    .active {
        border-bottom: 2px solid red;
    }
</style>