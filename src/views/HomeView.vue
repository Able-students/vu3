<script setup>
import Counter from '../components/Counter.vue';
import Calculator from '../components/Calculator.vue';
const printResult = (count, count1) => {
  alert('Count is: ' + count + count1)
}
</script>

<template>
  <main>
  <h1>ddd</h1>
    <Counter @printResult = "printResult"/>
    <Calculator />
  </main>
</template>

