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
import { ref, watch, isRef, computed, onMounted, reactive, readonly, isReactive, isReadonly, markRaw, toRaw } from 'vue';
import { useStore } from 'vuex';
const count = ref(0);

// let name = markRaw('able')

const user = ref({
  name: 'able', surname: 'jsjs'
})

const user1 = readonly({
  name: 'able', surname: 'jsjs'
})

console.log(toRaw(count), 'toRaw(count)')

user.value.name = 'gfeirfg'
user.value.surname = "fheioh"
console.log(user.value.name);
console.log(isReactive(user),'--isReactive(user)');
console.log(isReadonly(user),'--isReadonly(user)');

const emit = defineEmits();
const store = useStore();
const count1 = computed(() => store.state.countModule.count);
const list = computed(() => store.state.calcModule.list);
const coinList = ['0xbtc','usdt']


const increment = () => {
  count.value = count.value + 1
  store.commit('countModule/increaseCount')
  store.dispatch('countModule/setCountAndGet', 999999)
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