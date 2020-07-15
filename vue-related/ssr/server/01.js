const Vue = require('vue');
const server = require('express')()

// const app = new Vue({template: `<div>Hello World</div>`})

const renderer = require('vue-server-renderer').createRenderer()

// renderer.renderToString(app, (err, html) => {
//   if(err) throw err
//   console.log(html)
// })

// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(err => console.error(err))

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url || '/'
    },
    template: `<div>访问的URL是: {{url}}</div>`
  })

  renderer.renderToString(app).then(html => {
    res.send(html)
  }).catch(err => {
    res.status = 500
    res.send(err.message)
  })
})

server.listen(8080,() => {
  console.log(`http://localhost:8080`)
})