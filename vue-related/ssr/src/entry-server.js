// 仅运行于服务端

import { createApp } from './app'

export default context => {
  /**
   * 因为有可能会是已不够了钩子函数或㢟, 所以返回一个Promise,
   * 一遍服务器能够给等待所有的内容在渲染前就已经准备就绪
   */
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务器端touer的位置
    router.push(context.url)

    // 等到router将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由, 执行reject函数, 并返回404
      if(!matchedComponents.length) {
        return reject({code: 404})
      }

      Promise.all(matchedComponents.map(component => {
        if(component.asyncData) {
          return component.asyncData({store, route: router.currentRoute})
        }
      })).then(() => {
        /**
         * 在所有预取钩子(preFetch hook) resolve后,
         * 我们的store现在已经填充如渲染应用程序所需的状态 当我们将状态附加到上下文, 
         * 并且template选项用于render时,
         * 状态将自动序列化为window.__INITIAL_STATE__ 并注入HTML
         */
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  }, reject)

}