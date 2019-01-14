var path = require("path");
var fs = require("fs");
var gulp = require("gulp");
var ora = require("ora");
var nop = require("gulp-nop");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var config = require("./config");
var cssWrap = require("gulp-css-wrap"); //新增
var cleanCss = require("gulp-clean-css");

exports.fonts = function(opts) {
  var spin = ora(opts.message).start();
  var stream = gulp
    .src(path.resolve(config.themePath, "./src/fonts/**"))
    .pipe(opts.minimize || config.minimize ? cssmin({ showLog: false }) : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, "./fonts")))
    .on("end", function() {
      spin.succeed();
    });

  return stream;
};

exports.build = function(opts) {
  var spin = ora(opts.message).start();
  var stream;
  var components;
  var cssFiles = "*";

  if (config.components) {
    components = config.components.concat(["base"]);
    cssFiles = "{" + components.join(",") + "}";
  }
  var varsPath = path.resolve(config.themePath, "./src/common/var.scss");
  fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), "utf-8");

  stream = gulp
    .src([opts.config || config.config, path.resolve(config.themePath, "./src/" + cssFiles + ".scss")])
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: config.browsers,
        cascade: false
      })
    )
    .pipe(opts.minimize || config.minimize ? cssmin({ showLog: false }) : nop())
    .pipe(gulp.dest(opts.out || config.out))
    .on("end", function() {
      spin.succeed();
    });

  return stream;
};

/**添加命名空间 */
exports.wrap = function({ namespace, dist }) {
  var namespace = namespace || config.namespace;
  var themePath = path.resolve(process.cwd(), "./theme/index.css");
  var stream = gulp
    .src(themePath)
    .pipe(cssWrap({ selector: `.${namespace}` }))
    .pipe(cleanCss())
    .pipe(gulp.dest(path.resolve(process.cwd(), `./${dist || config.dist}/${namespace}`)));
  return stream;
};

/**移动fonts图标字体 */
exports.move = function({ namespace, dist }) {
  var namespace = namespace || config.namespace;
  var themePath = path.resolve(process.cwd(), "./theme/fonts/**");
  var stream = gulp.src(themePath).pipe(gulp.dest(path.resolve(process.cwd(), `./${dist || config.dist}/${namespace}/fonts`)));
  return stream;
};
