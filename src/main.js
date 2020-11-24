import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/styles/styles.scss'

createApp(App).use(VueAxios, axios).use(router).mount('#app')
