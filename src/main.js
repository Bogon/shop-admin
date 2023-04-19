import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'

import  'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import TreeTable from 'vue-table-with-tree-grid'


Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.filter('dateFromat', function (origin) {
  const dt = new Date(origin)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const day = (dt.getDay() +  '').padStart(2, '0')

  const hour = (dt.getHours() + '').padStart(2, '0')
  const minutes = (dt.getMinutes() + '').padStart(2, '0')
  const seconds = (dt.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
