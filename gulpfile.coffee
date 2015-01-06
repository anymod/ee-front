# vendor
spawn = require("child_process").spawn

gulp = require 'gulp'
gp = do require "gulp-load-plugins"

streamqueue = require 'streamqueue'
combine = require 'stream-combiner'

# ==========================
# task options

distPath = './dist'

htmlminOptions =
  removeComments: true
  removeCommentsFromCDATA: true
  collapseWhitespace: true
  # conservativeCollapse: true # otherwise <i> & text squished
  collapseBooleanAttributes: true
  removeAttributeQuotes: true
  removeRedundantAttributes: true
  caseSensitive: true
  minifyJS: true
  minifyCSS: true

# ==========================
# dev tasks

gulp.task 'css-dev', ->
  gulp.src './src/stylesheets**/e-app.less' # ** force to same dir
    .pipe gp.sourcemaps.init()
    .pipe gp.less paths: './src/stylesheets/' # @import path
    # write sourcemap to separate file w/o source content to path relative to dest below
    .pipe gp.sourcemaps.write './', {includeContent: false, sourceRoot: '../'}
    .pipe gulp.dest './src'

gulp.task 'js-dev', ->
  gulp.src './src/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src'

# ==========================
# prod tasks

gulp.task 'css-prod', ->
  gulp.src './src/stylesheets/e-app.less'
    # TODO: wait for minifyCss to support sourcemaps
    .pipe gp.replace "../bower_components/bootstrap/fonts/", "./fonts/"
    .pipe gp.replace "../bower_components/font-awesome/fonts/", "./fonts/"
    .pipe gp.less paths: './src/stylesheets/' # @import path
    .pipe gp.minifyCss cache: true, keepSpecialComments: 0 # remove all
    .pipe gulp.dest distPath

gulp.task 'js-prod', ->
  # inline templates; no need for ngAnnotate
  ngTemplates = gulp.src './src/components/**/ee-*.html'
    .pipe gp.htmlmin htmlminOptions
    .pipe gp.angularTemplatecache
      module: 'E.Templates'
      standalone: true
      root: 'components'

  # compile cs & annotate for min
  ngModules = gulp.src './src/**/*.coffee'
    .pipe gp.plumber()
    .pipe gp.replace "# 'E.Templates'", "'E.Templates'" # for e-app.coffee $templateCache
    .pipe gp.replace "'env', 'development'", "'env', 'production'" # TODO use gulp-ng-constant
    .pipe gp.coffee()
    .pipe gp.ngAnnotate()

  # src that need min
  otherSrc = [
    './src/bower_components/marked/lib/marked.js'
  ]
  other = gulp.src otherSrc

  # min above
  min = streamqueue objectMode: true, ngTemplates, ngModules, other
    .pipe gp.uglify()

  # src already min; order is respected
  otherMinSrc = [
    './src/bower_components/angular/angular.min.js'
    './src/bower_components/angular-cookies/angular-cookies.min.js'
    './src/bower_components/angular-bootstrap/ui-bootstrap.min.js'
    './src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
    './src/bower_components/firebase/firebase.js'
    # TODO: remove this dependency, ~45k
    './src/bower_components/lodash/dist/lodash.min.js'
    './src/bower_components/angulartics/dist/angulartics.min.js'
    './src/bower_components/angulartics/dist/angulartics-ga.min.js'
    './src/bower_components/angular-marked/angular-marked.js'
    './src/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js'
  ]
  otherMin = gulp.src otherMinSrc

  # concat
  # otherMin before min b/c otherMin has angular
  streamqueue objectMode: true, otherMin, min
    .pipe gp.concat 'e-app.js'
    .pipe gulp.dest distPath

gulp.task 'html-prod', ->
  gulp.src ['./src/index.html']
    .pipe gp.plumber()
    .pipe gp.htmlReplace
      css: 'e-app.css'
      js: 'e-app.js'
    .pipe gp.htmlmin htmlminOptions
    .pipe gulp.dest distPath

  gulp.src ['./src/sitemap.xml']
    .pipe gulp.dest distPath

# copy non-compiled files
gulp.task "copy-prod", ->
  gulp.src ['./src/img/**/*.*', './src/partials/**/*.html'], base: './src'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath

  gulp.src './src/bower_components/bootstrap/fonts/**/*.*'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath + '/fonts'

  gulp.src './src/bower_components/font-awesome/fonts/**/*.*'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath + '/fonts'

  gulp.src './views/*.*'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath + '/product'

  gulp.src './src/products.json'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath

  gulp.src './src/orders.json'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath

# ==========================

gulp.task 'server-dev', ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'index.html' # for angular html5mode
    port: 5000
  )

gulp.task 'server-prod', -> spawn 'foreman', ['start'], stdio: 'inherit'

# ==========================

gulp.task 'watch', ->
  gulp.src './src/stylesheets**/e-*.less'
    .pipe gp.watch {emit: 'one', name: 'css'}, ['css-dev']

  jsSrc = './src/**/*.coffee'
  gulp.src jsSrc
    .pipe gp.watch {emit: 'one', name: 'js'}, ['js-dev']

gulp.task 'dev', ['watch', 'server-dev'], -> return
gulp.task 'prod', ['css-prod', 'js-prod', 'html-prod', "copy-prod", 'server-prod'], -> return
