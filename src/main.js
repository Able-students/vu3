import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ComponentA, ComponentB } from './components/mixins';

const app = createApp(App);

app.component('component-a', ComponentA);
app.component('component-b', ComponentB);

app.use(router).use(store)

app.mount('#app')
