# vendor
spawn = require("child_process").spawn

argv  = require('yargs').argv
gulp  = require 'gulp'
gp    = do require "gulp-load-plugins"

streamqueue = require 'streamqueue'
combine     = require 'stream-combiner'
protractor  = require("gulp-protractor").protractor

# ==========================
# sources

# Ordered source for eeosk angular modules
eeModulesSrc = [
  './src/app/app.index.coffee'
  './src/app/core/core.module.coffee'
  './src/app/core/run.coffee'
  './src/app/core/constants.coffee'
  './src/app/core/filters.coffee'
  './src/app/core/config.coffee'
  './src/app/core/dataservice.coffee'
  './src/app/**/*.module.coffee'
  './src/app/**/*.route.coffee'
  './src/app/**/*.controller.coffee'
  './src/app/**/*.coffee'
  './src/components/**/*.coffee'
  # Exclude spec files
  '!./src/**/*.spec.coffee'
]

# Ordered vendor sources already min
vendorMinSrc = [
  ## TODO remove jQuery if not using cloudinary infra for file upload
  './src/bower_components/jquery/dist/jquery.min.js'
  './src/bower_components/angular/angular.min.js'
  './src/bower_components/angular-cookies/angular-cookies.min.js'
  './src/bower_components/angular-bootstrap/ui-bootstrap.min.js'
  './src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
  './src/bower_components/angulartics/dist/angulartics.min.js'
  './src/bower_components/angulartics/dist/angulartics-ga.min.js'
  './src/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js'
  ## TODO remove if using cloudinary infra for file upload
  './src/bower_components/ng-file-upload/angular-file-upload.min.js'
]

# Ordered vendor sources that need min
vendorUnminSrc = [
  './src/bower_components/firebase/firebase.js'
  ## TODO remove if not using cloudinary infra for file upload
  './src/bower_components/cloudinary/js/jquery.ui.widget.js'
  './src/bower_components/cloudinary/js/jquery.iframe-transport.js'
  './src/bower_components/cloudinary/js/jquery.fileupload.js'
  './src/bower_components/jquery.cloudinary.1.0.21.js'
]

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
# css tasks

gulp.task 'css-dev', ->
  gulp.src './src/stylesheets/ee.app.less' # ** force to same dir
    .pipe gp.sourcemaps.init()
    .pipe gp.less paths: './src/stylesheets/' # @import path
    # write sourcemap to separate file w/o source content to path relative to dest below
    .pipe gp.sourcemaps.write './', {includeContent: false, sourceRoot: '../'}
    .pipe gulp.dest './src/stylesheets'

gulp.task 'css-prod', ->
  gulp.src './src/stylesheets/ee.app.less'
    # TODO: wait for minifyCss to support sourcemaps
    .pipe gp.replace "../bower_components/bootstrap/fonts/", "./fonts/"
    .pipe gp.replace "../bower_components/font-awesome/fonts/", "./fonts/"
    .pipe gp.less paths: './src/stylesheets/' # @import path
    .pipe gp.minifyCss cache: true, keepSpecialComments: 0 # remove all
    .pipe gulp.dest distPath

# ==========================
# js tasks

gulp.task 'js-test', ->
  gulp.src './src/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.replace /@@eeBackUrl/g, 'http://localhost:5555'
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src/js'

gulp.task 'js-dev', ->
  gulp.src './src/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.replace /@@eeBackUrl/g, 'http://localhost:5000'
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src/js'

gulp.task 'js-prod', ->
  # inline templates; no need for ngAnnotate
  eeTemplates = gulp.src './src/components/ee*.html'
    .pipe gp.htmlmin htmlminOptions
    .pipe gp.angularTemplatecache
      module: 'EE.Templates'
      standalone: true
      root: 'components'

  # app modules; replace and annotate
  eeModules = gulp.src eeModulesSrc
    .pipe gp.plumber()
    .pipe gp.replace "# 'EE.Templates'", "'EE.Templates'" # for ee.app.coffee $templateCache
    .pipe gp.replace "'env', 'development'", "'env', 'production'" # TODO use gulp-ng-constant
    .pipe gp.replace /@@eeBackUrl/g, 'https://api.eeosk.com'
    .pipe gp.coffee()
    .pipe gp.ngAnnotate()

  vendorMin   = gulp.src vendorMinSrc
  vendorUnmin = gulp.src vendorUnminSrc

  # minified and uglify vendorUnmin, templates, and modules
  jsMin = streamqueue objectMode: true, vendorUnmin, eeTemplates, eeModules
    .pipe gp.uglify()

  # concat: vendorMin before jsMin because vendorMin has angular
  streamqueue objectMode: true, vendorMin, jsMin
    .pipe gp.concat 'ee.app.js'
    .pipe gulp.dest distPath

# ==========================
# html tasks

gulp.task 'html-prod', ->
  gulp.src ['./src/index.html']
    .pipe gp.plumber()
    .pipe gp.htmlReplace
      css: 'ee.app.css'
      js: 'ee.app.js'
    .pipe gp.htmlmin htmlminOptions
    .pipe gulp.dest distPath

  gulp.src ['./src/sitemap.xml']
    .pipe gulp.dest distPath

# ==========================
# other tasks
# copy non-compiled files
gulp.task "copy-prod", ->
  gulp.src ['./src/img/**/*.*', './src/app/**/*.html'], base: './src'
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

  gulp.src './src/products.json'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath

  gulp.src './src/orders.json'
    .pipe gp.plumber()
    .pipe gp.changed distPath
    .pipe gulp.dest distPath


# ==========================
# protractors

gulp.task 'protractor-test', ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--grep', (argv.grep || ''), '--baseUrl', 'http://localhost:3333', '--apiUrl', 'http://localhost:5555']
    .on 'error', (e) -> return

gulp.task 'protractor-prod', ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--baseUrl', 'http://localhost:3333', '--apiUrl', 'http://localhost:5555']
    .on 'error', (e) -> return

gulp.task 'protractor-live', ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--grep', (argv.grep || ''), '--baseUrl', 'https://eeosk.com', '--apiUrl', 'https://api.eeosk.com']
    .on 'error', (e) -> return

# ==========================
# servers

gulp.task 'server-test', ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'index.html' # for angular html5mode
    port: 3333
  )

gulp.task 'server-dev', ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'index.html' # for angular html5mode
    port: 3000
  )

gulp.task 'server-prod', -> spawn 'foreman', ['start'], stdio: 'inherit'

# ==========================
# watchers

gulp.task 'watch-dev', ->
  gulp.src './src/stylesheets/ee*.less'
    .pipe gp.watch {emit: 'one', name: 'css'}, ['css-dev']

  jsSrc = './src/**/*.coffee'
  gulp.src jsSrc
    .pipe gp.watch {emit: 'one', name: 'js'}, ['js-dev']

gulp.task 'watch-test', ->
  gulp.src './src/stylesheets/ee*.less'
    .pipe gp.watch {emit: 'one', name: 'css'}, ['css-dev']

  jsSrc = './src/**/*.coffee'
  gulp.src jsSrc
    .pipe gp.watch {emit: 'one', name: 'js'}, ['js-test']

  gulp.src './src/e2e/*e2e*.coffee'
    .pipe gp.watch {emit: 'one', name: 'test'}, ['protractor-test']

# ===========================
# runners

gulp.task 'test', ['watch-test', 'server-test'], -> return

gulp.task 'dev', ['watch-dev', 'server-dev'], -> return

gulp.task 'pre-prod-test', ['css-prod', 'html-prod', 'copy-prod', 'js-prod', 'server-prod'], ->
  gulp.src './dist/ee.app.js'
    .pipe gp.replace /https:\/\/api\.eeosk\.com/g, 'http://localhost:5555'
    .pipe gulp.dest distPath
  return

gulp.task 'prod-test', ['pre-prod-test', 'protractor-prod']

gulp.task 'prod', ['css-prod', 'js-prod', 'html-prod', 'copy-prod', 'server-prod'], -> return
