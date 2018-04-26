const fs = require('fs-extra')

// copy file
fs.copy('src/index.html', './dist/index.html', {overwrite: true}, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('index.html copied')
});
