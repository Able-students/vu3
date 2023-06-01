<template>
  <hr />
  <h3> Reactive {{ count }} </h3>
  <h4>{{ count1 }}</h4>
  <button v-on:click="decrement">-1</button>
  <button @click="increment">+1</button>
  <img v-for="elem in coinList" :src="`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${elem}.png`" />
  <p v-for="elem in list">{{elem?.title}}</p>
  <hr />
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const count = ref(0);
const emit = defineEmits();
const store = useStore();
const count1 = computed(() => store.state.countModule.count);
const list = computed(() => store.state.calcModule.list);
const coinList = ['0xbtc','usdt']
const increment = () => {
  count.value = count.value + 1
  store.commit('countModule/increaseCount')
  console.log(store.getters['countModule/getCount'],'--1')
  console.log(store.getters['calcModule/getCount'],'--2')
  store.dispatch('countModule/setCountAndGet', 999999)
  console.log(count1.value, store.state.countModule.count, '--count1')
}

onMounted(() => {
  store.dispatch('calcModule/loadData')
})

const decrement = () => {
  count.value = count.value - 1;
  emit('printResult', count.value, count.value );
}

watch(list, (newValue) => {
  console.log(newValue, '---list')
  console.log(list.value, '---list 2')
})


</script>

<style scoped>
</style>