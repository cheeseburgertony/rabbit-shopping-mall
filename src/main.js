import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入图片懒加载指令的插件，然后进行注册
import { lazyPlugin } from './directives'

// 映入组件注册插件，然后进行注册
import { componentPlugin } from './components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
