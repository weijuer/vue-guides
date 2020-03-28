import Vue from 'vue'
import App from './App.vue'
import './plugins/vant'
import vueGuide from './plugins/guide'

Vue.config.productionTip = false
Vue.use(vueGuide)

new Vue({
  render: h => h(App)
}).$mount('#app')
