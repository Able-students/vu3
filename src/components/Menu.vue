<template lang="">
    <nav>
        <span v-for="item in data">{{item}}</span>
    </nav>
    <h2>{{powerNum}}</h2>
</template>
<script setup>
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
   const menuList = ref(props.data)
   const powerNum = computed(() => props.num ** props.num)
</script>
<style scoped>
    span {
        margin: 0 10px;
    }
</style>