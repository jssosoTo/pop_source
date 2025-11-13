import { createApp } from 'vue'
import './style.css'
import "animate.css";
import App from './App.vue'
import { createPinia } from 'pinia';
import translation, { translateOptions } from './ultis/i18n.js';
import router from './router';

const app = createApp(App);

app
    .use(createPinia())
    .use(translation, translateOptions)
    .use(router)

app.mount('#app')