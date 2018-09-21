import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'
import store from '@/stores/store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'https://api.github.com'

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
