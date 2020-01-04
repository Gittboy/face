import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import mint from 'mint-ui'
// 导入mint-ui全局样式表
import 'mint-ui/lib/style.css'

import axios from 'axios'
Vue.prototype.http = axios

import jq from 'jquery'

import { checkRes, debounce, throttle, getAjax } from './common/public/pubMethod.js'
//  在Vue.prototype对象下面注册全局信息
Object.assign(Vue.prototype, {
    checkRes,
    debounce,
    throttle,
    getAjax
})

// import vant from 'vant-ui'
// import 'vant-ui/lib'
// Vue.use(vant)
// import './common/public/style.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')