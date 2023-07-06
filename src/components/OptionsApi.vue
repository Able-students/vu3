<template>
    <h1>It is options</h1>
    <component-a></component-a>
    <component-b></component-b>
</template>

<script>
import { myMixin } from './mixins.js'

export default {
    name: 'Options',
    mixins: [myMixin],
    props: {},
    emits: {},
    data(){
        return {
        }
    },
    mounted(){
        this.alertData()
    }
}
</script>