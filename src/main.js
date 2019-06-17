import Vue from 'vue'
import './cube-ui'
import App from './App.vue'

import 'stylus/index.styl'
// 在js文件中引入，直接使用别名即可

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
