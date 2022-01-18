import { createApp } from 'vue'
import router from '@/router'
import { key, store } from '@/store'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)

// Use Vue Router
app.use(router)

// Use Vuex
app.use(store, key)

app.mount('#app')
