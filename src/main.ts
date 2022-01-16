import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

const app = createApp(App)

// Use Vue Router
app.use(router)

app.mount('#app')
