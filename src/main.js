import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(mint)

import axios from 'axios'
Vue.prototype.http = axios

import jq from 'jquery'

import { checkRes, debounce } from './common/public/pubMethod.js'
Vue.prototype.checkRes = checkRes
Vue.prototype.debounce = debounce

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