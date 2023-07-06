<template lang="">
    <div class='row'>
        <nav>
            <span v-for="item in data" @click="router.push(item.path)" :class="item.path === path ? 'active' : ''">{{item.name}}</span>
        </nav>
        <Auth/> 
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, defineComponent } from 'vue'
import Auth from './auth.vue'

   const props = defineProps({
    data: {
        type: Array,
        default: []
    }
   })
   defineComponent([Auth])

   const router = useRouter();
   const route=useRoute();
   const path = computed(() =>route.path)

   const menuList = ref(props.data)
</script>
<style scoped>
    span {
        margin: 0 10px;
    }
    .active {
        border-bottom: 2px solid red;
    }
    .row{
        display: flex;
        align-items: center;
    }
</style>