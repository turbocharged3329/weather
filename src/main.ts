import { createApp } from 'vue'
import '@/assets/scss/main.scss'
import App from '../App.vue'
import { createPinia } from 'pinia'
import clickOutside from '@/directives/clickOutside.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.directive('click-outside', clickOutside)

app.mount('#app')
