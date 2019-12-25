import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(mint)

// import vant from 'vant-ui'
// import 'vant-ui/lib'
// Vue.use(vant)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')