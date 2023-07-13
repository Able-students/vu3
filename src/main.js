import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ComponentA, ComponentB } from './hooks/mixins';
import QRCodeVue3 from "qrcode-vue3";
import { createI18n } from 'vue-i18n';
import en from './translations/en.json';
import ru from './translations/ru.json';
import kz from './translations/kz.json';

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'en',
    messages: {
        en, ru, kz
    }
})

document.documentElement.lang = localStorage.getItem('lang') || 'en'

const app = createApp(App);

app.component('component-a', ComponentA);
app.component('component-b', ComponentB);
app.component('QRCodeVue3', QRCodeVue3);

app.use(router).use(store).use(i18n);

app.mount('#app');
