import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor/* { default global options } */)
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' // 配置根路径
// Vue.prototype.$http = axios // 把axios挂载到Vue原型上
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
Vue.filter('dateFormat', function(originVal) { // 全局时间格式化过滤器
 const dt = new Date(originVal)
 const y = dt.getFullYear()
 const m = (dt.getMonth() + 1 + '').padStart(2, '')
 const d = (dt.getDate() + '').padStart(2, '')

 const hh = (dt.getHours() + '').padStart(2, '')
 const mm = (dt.getMinutes() + '').padStart(2, '')
 const ss = (dt.getSeconds() + '').padStart(2, '')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
