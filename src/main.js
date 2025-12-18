import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './styles/common.scss'

import { componentPlugin } from '@/components/index'

// 引入懒加载指令
import { imgLazyLoad } from '@/directives/imgLazyLoad'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(imgLazyLoad)
app.use(componentPlugin)

pinia.use(piniaPluginPersistedstate)

app.mount('#app')
