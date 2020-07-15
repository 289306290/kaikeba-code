const path = require('path');
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = dir => path.resolve(__dirname, dir)
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
const isProd = process.env.NODE_ENV === 'production'

const app = express()
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),

    // recommended for performance
    runInNewContext: false
  })) {
    let render, readyPromise;
    const templatePath = resolve('./src/index.template.html');

    const template = require('fs').readFileSync(templatePath, 'utf-8')
    const clientManifest = require(resolve('./dist/client/vue-ssr-client-manifest.json'));
  }
}


const serverBundle = require(resolve('./dist/server/vue-ssr-server-bundle.json'))

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, 
  template,
  clientManifest
})

app.get('*', (req, res) => {
  const context = { url: req.url }

  renderer.renderToString(context, (err, html) =>{
    res.end(html)
  })
})





app.listen(8080, () => {
  console.log('server listening at 8080. http://localhost:8080')
})