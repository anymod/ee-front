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
  './src/builder/builder.index.coffee'
  './src/builder/core/core.module.coffee'
  './src/builder/core/run.coffee'
  './src/builder/core/constants.coffee'
  './src/builder/core/filters.coffee'
  './src/builder/core/config.coffee'
  './src/builder/core/svc.auth.coffee'
  './src/builder/core/svc.back.coffee'
  './src/builder/core/svc.catalog.coffee'
  './src/builder/core/svc.orders.coffee'
  './src/builder/core/svc.selection.coffee'
  './src/builder/core/svc.storefront.coffee'
  './src/builder/core/svc.other.coffee'
  './src/builder/**/*.module.coffee'
  './src/builder/**/*.route.coffee'
  './src/builder/**/*.controller.coffee'
  './src/builder/**/*.coffee'
  './src/components/ee-product.coffee'
  './src/components/**/*.coffee'
  # Exclude spec files
  '!./src/**/*.spec.coffee'
]

# Ordered vendor sources already min
vendorMinSrc = [
  ## TODO remove jQuery if not using cloudinary infra for file upload
  './src/bower_components/jquery/dist/jquery.min.js'
  './src/bower_components/angular/angular.min.js'
  './src/bower_components/angular-sanitize/angular-sanitize.min.js'
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

## Store
storeModulesSrc = [
  './src/store/store.index.coffee'
  './src/store/store.controller.coffee'
]
storeVendorMinSrc = [
  './src/bower_components/angular/angular.min.js'
  './src/bower_components/angular-sanitize/angular-sanitize.min.js'
  './src/bower_components/angular-cookies/angular-cookies.min.js'
  './src/bower_components/angular-bootstrap/ui-bootstrap.min.js'
  './src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
  './src/bower_components/angulartics/dist/angulartics.min.js'
  './src/bower_components/angulartics/dist/angulartics-ga.min.js'
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

gulp.task 'css-dev', () ->
  gulp.src './src/stylesheets/ee.builder.less' # ** force to same dir
    .pipe gp.sourcemaps.init()
    .pipe gp.less paths: './src/stylesheets/' # @import path
    # write sourcemap to separate file w/o source content to path relative to dest below
    .pipe gp.sourcemaps.write './', {includeContent: false, sourceRoot: '../'}
    .pipe gulp.dest './src/stylesheets'

gulp.task 'css-prod', () ->
  gulp.src './src/stylesheets/ee.builder.less'
    # TODO: wait for minifyCss to support sourcemaps
    .pipe gp.replace "../bower_components/bootstrap/fonts/", "./fonts/"
    .pipe gp.replace "../bower_components/font-awesome/fonts/", "./fonts/"
    .pipe gp.less paths: './src/stylesheets/' # @import path
    .pipe gp.minifyCss cache: true, keepSpecialComments: 0 # remove all
    .pipe gulp.dest distPath

# ==========================
# js tasks

gulp.task 'js-test', () ->
  gulp.src './src/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.replace /@@eeBackUrl/g, 'http://localhost:5555'
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src/js'

gulp.task 'js-dev', () ->
  gulp.src './src/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.replace /@@eeBackUrl/g, 'http://localhost:5000'
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src/js'

gulp.task 'js-prod', () ->
  # inline templates; no need for ngAnnotate
  eeTemplates = gulp.src './src/components/ee*.html'
    .pipe gp.htmlmin htmlminOptions
    .pipe gp.angularTemplatecache
      module: 'EE.Templates'
      standalone: true
      root: 'components'

  # builder modules; replace and annotate
  eeModules = gulp.src eeModulesSrc
    .pipe gp.plumber()
    .pipe gp.replace "# 'EE.Templates'", "'EE.Templates'" # for ee.builder.coffee $templateCache
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
    .pipe gp.concat 'ee.builder.js'
    .pipe gulp.dest distPath

gulp.task 'js-dev-store', () ->
  gulp.src './src/store/**/*.coffee' # ** glob forces dest to same subdir
    .pipe gp.replace /@@eeBackUrl/g, 'http://localhost:5000'
    .pipe gp.plumber()
    .pipe gp.sourcemaps.init()
    .pipe gp.coffee()
    .pipe gp.sourcemaps.write './'
    .pipe gulp.dest './src/js/store'

gulp.task 'js-prod-store', () ->
  # inline templates; no need for ngAnnotate
  eeTemplates = gulp.src ['./src/components/ee*.html']
    .pipe gp.htmlmin htmlminOptions
    .pipe gp.angularTemplatecache
      module: 'EE.Templates'
      standalone: true
      root: 'components'

  # builder modules; replace and annotate
  eeModules = gulp.src storeModulesSrc
    .pipe gp.plumber()
    .pipe gp.replace "# 'EE.Templates'", "'EE.Templates'" # for ee.builder.coffee $templateCache
    .pipe gp.replace "'env', 'development'", "'env', 'production'" # TODO use gulp-ng-constant
    .pipe gp.replace /@@eeBackUrl/g, 'https://api.eeosk.com'
    .pipe gp.coffee()
    .pipe gp.ngAnnotate()

  vendorMin = gulp.src storeVendorMinSrc

  # minified and uglify vendorUnmin, templates, and modules
  jsMin = streamqueue objectMode: true, eeTemplates, eeModules
    .pipe gp.uglify()

  # concat: vendorMin before jsMin because vendorMin has angular
  streamqueue objectMode: true, vendorMin, jsMin
    .pipe gp.concat 'ee.store.js'
    .pipe gulp.dest distPath + '/store'

# ==========================
# html tasks

gulp.task 'html-prod', () ->
  gulp.src ['./src/builder.html']
    .pipe gp.plumber()
    .pipe gp.htmlReplace
      css: 'ee.builder.css'
      js: 'ee.builder.js'
    .pipe gp.htmlmin htmlminOptions
    .pipe gulp.dest distPath

  gulp.src ['./src/sitemap.xml']
    .pipe gulp.dest distPath

gulp.task 'html-prod-store', () ->
  gulp.src ['./src/store.html']
    .pipe gp.plumber()
    .pipe gp.htmlReplace
      css: 'ee.store.css'
      js: 'ee.store.js'
    # .pipe gp.htmlmin htmlminOptions
    .pipe gulp.dest distPath

  # gulp.src ['./src/store/sitemap.xml']
    # .pipe gulp.dest distPath + '/store'

# ==========================
# other tasks
# copy non-compiled files

gulp.task "copy-prod", () ->
  gulp.src ['./src/img/**/*.*', './src/builder/**/*.html'], base: './src'
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


# ==========================
# protractors

gulp.task 'protractor-test', () ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--grep', (argv.grep || ''), '--baseUrl', 'http://localhost:3333', '--apiUrl', 'http://localhost:5555']
    .on 'error', (e) -> return

gulp.task 'protractor-prod', () ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--baseUrl', 'http://localhost:3333', '--apiUrl', 'http://localhost:5555']
    .on 'error', (e) -> return

gulp.task 'protractor-live', () ->
  gulp.src ['./src/e2e/config.coffee', './src/e2e/*.coffee']
    .pipe protractor
      configFile: './protractor.conf.js'
      args: ['--grep', (argv.grep || ''), '--baseUrl', 'https://eeosk.com', '--apiUrl', 'https://api.eeosk.com']
    .on 'error', (e) -> return

# ==========================
# servers

gulp.task 'server-test', () ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'builder.html' # for angular html5mode
    port: 3333
  )

gulp.task 'server-dev', () ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'builder.html' # for angular html5mode
    port: 3000
  )

gulp.task 'server-test-store', () ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'store.html' # for angular html5mode
    port: 4444
  )

gulp.task 'server-dev-store', () ->
  gulp.src('./src').pipe gp.webserver(
    fallback: 'store.html' # for angular html5mode
    port: 4000
  )

gulp.task 'server-prod', () -> spawn 'foreman', ['start'], stdio: 'inherit'

# ==========================
# watchers

gulp.task 'watch-dev', () ->
  gulp.src './src/stylesheets/ee*.less'
    .pipe gp.watch {emit: 'one', name: 'css'}, ['css-dev']

  jsSrc = './src/**/*.coffee'
  gulp.src jsSrc
    .pipe gp.watch {emit: 'one', name: 'js'}, ['js-dev']

gulp.task 'watch-test', () ->
  gulp.src './src/stylesheets/ee*.less'
    .pipe gp.watch {emit: 'one', name: 'css'}, ['css-dev']

  jsSrc = './src/**/*.coffee'
  gulp.src jsSrc
    .pipe gp.watch {emit: 'one', name: 'js'}, ['js-test']

  gulp.src './src/e2e/*e2e*.coffee'
    .pipe gp.watch {emit: 'one', name: 'test'}, ['protractor-test']

# ===========================
# runners

gulp.task 'test', ['watch-test', 'server-test'], () -> return

gulp.task 'dev', ['watch-dev', 'server-dev'], () -> return

gulp.task 'dev-store', ['watch-dev', 'server-dev-store'], () -> return

gulp.task 'pre-prod-test', ['css-prod', 'html-prod', 'copy-prod', 'js-prod', 'server-prod'], () ->
  gulp.src './dist/ee.builder.js'
    .pipe gp.replace /https:\/\/api\.eeosk\.com/g, 'http://localhost:5555'
    .pipe gulp.dest distPath
  return

gulp.task 'prod-test', ['pre-prod-test', 'protractor-prod']

gulp.task 'prod', ['css-prod', 'js-prod', 'html-prod', 'copy-prod', 'server-prod'], () -> return
