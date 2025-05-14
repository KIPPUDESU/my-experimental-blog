// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入pinia
import { createPinia } from 'pinia'

import './assets/styles.css'


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(createPinia()) 
app.mount('#app')