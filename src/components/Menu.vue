<template lang="">
    <div class='row'>
        <nav>
            <span v-for="item in data" @click="router.push(item.path)" :class="item.path === path ? 'active' : ''">{{item.name}}</span>
        </nav>
        <select v-model="lang" @change="() => { $i18n.locale = lang }">
            <option v-for="elem of Object.keys($i18n.messages)">{{elem}}</option>
        </select>
        <Auth/> 
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, defineComponent, watch } from 'vue'
import Auth from './Auth.vue';

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
   const lang = ref(localStorage.lang)
   const menuList = ref(props.data)
   watch(lang, (newVal) => {
    localStorage.lang = newVal;
   })
</script>
<style scoped>
    span {
        margin: 0 10px;
    }
    .active {
        padding-bottom: 6px;
        border-bottom: 2px solid rgb(244, 238, 238);
    }
    .row{
        display: flex;
        align-items: center;
    }
</style>