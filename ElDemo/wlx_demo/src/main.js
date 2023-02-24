import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入animate动画
import 'animate.css';
//引入axios
import axios from 'axios'



Vue.use(ElementUI);  //使用element-ui 
Vue.prototype.$axios = axios  //使用axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// //建立ws链接
// const ws = new WebSocket("ws://localhost:80/webSocket/wsson")
// ws.onopen = () => {
//   if (ws.readyState == 1) {
//     console.log("ws已建立链接...");
//   }
// }
// ws.onclose = function () {
//   console.log("ws链接已关闭...");
// }

// //创建websocket实例
// Vue.prototype.$socket 