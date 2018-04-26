var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify')
var envify = require('envify/custom')

browserify('dev/app.js')
  .transform(vueify)
  .plugin('vueify/plugins/extract-css', {
    out: './dist/bundle.css' // can also be a WritableStream
  })
  .transform(
    // Required in order to process node_modules files
    { global: true },
    envify({ NODE_ENV: 'production' })
  )
  .bundle()
  .pipe(fs.createWriteStream("./dist/bundle.js"))
