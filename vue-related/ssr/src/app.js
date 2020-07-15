// 通用entry(unversal entry)

const Vue = require('vue')
const App = require('./App.vue')
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

export function createApp(context) {
  // 创建router和store实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)和store注入
  sync(store, router)

  // 创建应用程序实例, 将router和store注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}