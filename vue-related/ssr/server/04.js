const path = require('path')
const createApp = require('../app')
const server = require('express')()

const resolve = dir => path.resolve(__dirname, dir)

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(resolve('../public/index.template.html'), 'utf-8')
})


server.get('*', (req, res) => {
  const context = { url: req.url }
  
  createApp(context).then(app => {
    renderer.renderToString(
      app, 
      // 渲染上下文对象
      {
        title: 'hello',
        meta: `
          <meta name="keyword" content="vue, ssr, vue-ssr">
          <meta name="description" content="vue ssr">
        `
      },
      (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found')
          } else {
            res.status(404).end('Internal Server Error')
          }
        } else {
          res.end(html)
        }
      }
    )
  })
  
})

server.listen(8080, () => {

  console.log('http://localhost:8080')
})