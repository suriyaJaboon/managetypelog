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
// Vue.axios.defaults.baseURL = '/logger/modules/managegroups/app.php'
Vue.axios.defaults.baseURL = '/mock-data.jsonn'
Vue.axios.defaults.headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
