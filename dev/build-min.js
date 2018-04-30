var UglifyJS = require("uglify-js");
var fs = require("fs")
var options = {
  sourceMap: {
    url: "bundle.min.js.map"
  }
};
var result = UglifyJS.minify({
  "bundle.js": fs.readFileSync("dist/bundle.js", "utf8"),
}, options);

if (result.error) {
  console.log(result.error);
  process.exit(1);
}
fs.writeFileSync("dist/bundle.min.js", result.code, "utf8");
fs.writeFileSync("dist/bundle.min.js.map", result.map, "utf8");
console.log('minified file generated')
