// 仅运行于浏览器
import Vue from 'vue';
import { createApp } from './app'

// global mixin
Vue.mixin({
  // beforeMount() {
  //   const { asyncData } = this.$options

  //   if(asyncData) {
  //     /**
  //      * 将获取数据操作分配给promise
  //      * 以便在组件中, 可以在数据准备就绪后
  //      * 通过信息 this.dataPromise.then() 来执行数据
  //      */
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route
  //     })

  //   }
  // },
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next)
      .catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

if(window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  /**
   * 在路由导航之前解析数据
   * 
   * 添加路由钩子函数, 用于处理asyncData
   * 在初始路由resolve后执行
   * 一遍我们不会二次预取(double-fetch)已有的数据
   * 使用`router.beforeResolve()` 以便确保所有异步组件都resolve.
   */

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 只关心非预渲染的组件
    // 所以我们对比他们, 找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if(!activated.length) {
      return next()
    }

    // 设置加载指示器  kiadubg ubducatir,,,
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({store, route, to})
      }
    })).then(() => {

      // 停止加载指示器
      next()
    }).catch(next)
  })

  app.$mount('#app', true)
})

