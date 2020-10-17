import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
//全局样式
import './styles/reset.css'
//字体图标样式
import './styles/iconfont/iconfont.css'

//阻止启动生产消息(消息提示的环境配置，设置为开发环境或者生产环境)
Vue.config.productionTip = false

//抛出一个错误路由
router.onError(function(e) {
  // console.log(e);
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = e.message.match(pattern)
  if (isChunkLoadFailed) {
    Message({
      message: '平台版本已更新，3秒后自动为您刷新页面',
      type: 'error',
      duration: 5 * 1000
    })

    setTimeout(() => {
      window.location.reload()
    }, 3000)
  } else {
    Message({
      message: e.message,
      type: 'error',
      duration: 5 * 1000
    })
  }
})

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
