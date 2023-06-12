<script setup>
    import Counter from '../components/Counter.vue';
    const printResult = (count, count1) => {
        alert('Count is: ' + count + count1)
    }
</script>
<template>
    <main>
        <h2>Counter</h2>
        <Counter @printResult = "printResult"/>  
    </main>
</template>