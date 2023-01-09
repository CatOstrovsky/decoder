import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import modal from "@/plugins/modal"

import './assets/main.scss'

const app = createApp(App)

app.use(modal)
app.use(createPinia())
app.use(router)

app.mount('#app')
