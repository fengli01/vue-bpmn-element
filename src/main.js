import Vue from 'vue'
import App from './App.vue'
import dateUtil from './libs/dateUtil'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import http from './libs/http'
import Apis from './libs/api'
import 'reset.css/reset.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import './components/bpmn/assets/css/vue-bmpn.css'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/element-ui.css'
import './assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.use(http).use(ElementUI).use(dateUtil)
Vue.prototype.Apis = Apis
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
