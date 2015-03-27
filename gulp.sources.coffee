_       = require 'lodash'
sources = {}

stripSrc  = (arr) -> _.map arr, (str) -> str.replace('./src/', '')
toJs      = (arr) -> _.map arr, (str) -> str.replace('.coffee', '.js').replace('./src/', 'js/')
unmin     = (arr) ->
  _.map arr, (str) -> str.replace('dist/angulartics', 'src/angulartics').replace('.min.js', '.js')

sources.builderJs = () ->
  [].concat stripSrc(unmin(sources.builderVendorMin))
    .concat stripSrc(sources.builderVendorUnmin)
    .concat toJs(sources.appModule)
    .concat toJs(sources.builderModule)
    .concat toJs(sources.builderDirective)

sources.storeJs = () ->
  [].concat stripSrc(unmin(sources.storeVendorMin))
    .concat stripSrc(sources.storeVendorUnmin)
    .concat toJs(sources.appModule)
    .concat toJs(sources.storeModule)
    .concat toJs(sources.storeDirective)

sources.builderModules = () ->
  [].concat sources.appModule
    .concat sources.builderModule
    .concat sources.builderDirective

sources.storeModules = () ->
  [].concat sources.appModule
    .concat sources.storeModule
    .concat sources.storeDirective

### VENDOR ###
sources.builderVendorMin = [
  # TODO remove once cloudinary jQuery upload is gone
  './src/bower_components/jquery/dist/jquery.min.js'
  './src/bower_components/angular/angular.min.js'
  './src/bower_components/angular-sanitize/angular-sanitize.min.js'
  './src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
  './src/bower_components/angular-cookies/angular-cookies.min.js'
  './src/bower_components/angulartics/dist/angulartics.min.js'
  './src/bower_components/angulartics/dist/angulartics-ga.min.js'
  './src/bower_components/angular-bootstrap/ui-bootstrap.min.js'
  './src/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js'
]
sources.builderVendorUnmin = [
  # TODO remove firebase
  './src/bower_components/firebase/firebase-debug.js'
  './src/bower_components/cloudinary/js/jquery.ui.widget.js'
  './src/bower_components/cloudinary/js/jquery.iframe-transport.js'
  './src/bower_components/cloudinary/js/jquery.fileupload.js'
  './src/bower_components/jquery.cloudinary.1.0.21.js'
]
sources.storeVendorMin = [
  './src/bower_components/angular/angular.min.js'
  './src/bower_components/angular-sanitize/angular-sanitize.min.js'
  './src/bower_components/angular-cookies/angular-cookies.min.js'
  './src/bower_components/angular-bootstrap/ui-bootstrap.min.js'
  './src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
  './src/bower_components/angulartics/dist/angulartics.min.js'
  './src/bower_components/angulartics/dist/angulartics-ga.min.js'
]
sources.storeVendorUnmin = [

]

### MODULE ###
sources.appModule = [
  # Definitions
  './src/app/core/core.module.coffee'
  './src/app/core/constants.coffee'
  './src/app/core/filters.coffee'
  './src/app/core/config.coffee'
  './src/app/core/run.coffee'
  # Services
  './src/app/core/svc.back.coffee'
  './src/app/core/svc.storefront.coffee'
  './src/app/core/svc.catalog.coffee'
  # Examples
  './src/app/examples/examples.controller.coffee'
]
sources.builderModule = [
  # Definitions
  './src/builder/builder.index.coffee'
  './src/builder/core/core.module.coffee'
  './src/builder/core/run.coffee'
  # Services
  './src/builder/core/svc.auth.coffee'
  './src/builder/core/svc.orders.coffee'
  './src/builder/core/svc.selection.coffee'
  './src/builder/core/svc.cart.coffee'
  # Module - auth
  './src/builder/auth/auth.module.coffee'
  # auth.login
  './src/builder/auth.login/auth.login.route.coffee'
  './src/builder/auth.login/auth.login.controller.coffee'
  # auth.logout
  './src/builder/auth.logout/auth.logout.route.coffee'
  './src/builder/auth.logout/auth.logout.controller.coffee'
  # auth.reset
  './src/builder/auth.reset/auth.reset.route.coffee'
  './src/builder/auth.reset/auth.reset.controller.coffee'
  # auth.signup
  './src/builder/auth.signup/auth.signup.route.coffee'
  './src/builder/auth.signup/auth.signup.controller.coffee'
  # Module - landing
  './src/builder/landing/landing.module.coffee'
  './src/builder/landing/landing.route.coffee'
  './src/builder/landing/landing.controller.coffee'
  # Module - about
  # './src/builder/about/about.module.coffee'
  # './src/builder/about/about.route.coffee'
  # './src/builder/about/about.controller.coffee'
  # Module - terms
  './src/builder/terms/terms.module.coffee'
  './src/builder/terms/terms.route.coffee'
  './src/builder/terms/terms.controller.coffee'
  # Module - storefront
  './src/builder/storefront/storefront.module.coffee'
  './src/builder/storefront/storefront.route.coffee'
  './src/builder/storefront/storefront.controller.coffee'
  # Module - catalog
  './src/builder/catalog/catalog.module.coffee'
  './src/builder/catalog/catalog.route.coffee'
  './src/builder/catalog/catalog.controller.coffee'
  './src/builder/catalog/catalog.offscreen.right.controller.coffee'
  # Module - orders
  './src/builder/orders/orders.module.coffee'
  './src/builder/orders/orders.route.coffee'
  './src/builder/orders/orders.controller.coffee'
  # Module - account
  './src/builder/account/account.module.coffee'
  './src/builder/account/account.route.coffee'
  './src/builder/account/account.controller.coffee'
]
sources.storeModule = [
  # Definitions
  './src/store/store.index.coffee'
  './src/store/core/core.module.coffee'
  './src/store/core/run.coffee'
  './src/store/core/core.route.coffee'
  # Services
  './src/store/core/svc.auth.coffee'
  './src/store/core/svc.cart.coffee'
  # Module - store
  './src/store/store.controller.coffee'
]

### DIRECTIVES ###
sources.builderDirective = [
  './src/components/ee-terms-seller.coffee'
  './src/components/ee-terms-privacy.coffee'
  './src/components/ee-navbar.coffee'
  './src/components/ee-product.coffee'
  './src/components/ee-save.coffee'
  './src/components/ee-offscreen-toggle.coffee'
  './src/components/ee-offscreen-header.coffee'
  './src/components/ee-product-detail.coffee'
  './src/components/ee-product-for-catalog.coffee'
  './src/components/ee-product-for-storefront.coffee'
  './src/components/ee-shop-nav.coffee'
  './src/components/ee-product-margin-setter.coffee'
  './src/components/ee-product-selection-button.coffee'
  './src/components/ee-order.coffee'
  './src/components/ee-cloudinary-upload.coffee'
  './src/components/ee-welcome.coffee'
  './src/components/ee-image-preload.coffee'
]
sources.storeDirective = [
  './src/components/ee-button-add-to-cart.coffee'
  './src/components/ee-product.coffee'
  './src/components/ee-product-detail.coffee'
  './src/components/ee-product-for-storefront.coffee'
  './src/components/ee-shop-nav.coffee'
]

module.exports = sources
