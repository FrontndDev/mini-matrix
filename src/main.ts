import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import router from "./router";
import store from "./store";

const app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#matrix-app')
