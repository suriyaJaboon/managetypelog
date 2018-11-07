import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueOnToast from 'vue-on-toast'
import VTooltip from 'v-tooltip'
import App from '@/App.vue'
import store from '@/stores/store'

Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.use(VueAxios, axios)
Vue.use(VueOnToast)
// Vue.axios.defaults.baseURL = 'api.php'
Vue.axios.defaults.baseURL = '/logger/modules/managetypelog/api.php'
Vue.axios.defaults.headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
