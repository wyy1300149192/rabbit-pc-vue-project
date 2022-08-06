import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/styles/common.less'
import componentPlugin from '@/components'
import directivePlugin from '@/directives'
// 创建一个vue应用实例
createApp(App).use(store).use(router).use(componentPlugin).use(directivePlugin).mount('#app')
