import './assets/style/main.css'

import { createApp } from 'vue'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity, { autoClose: 3000 })

app.mount('#app')
