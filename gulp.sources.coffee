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

sources.builderModules = () ->
  [].concat sources.appModule
    .concat sources.builderModule
    .concat sources.builderDirective

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
  './src/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
  './src/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js'
  './src/bower_components/angular-scroll/angular-scroll.min.js'
]
sources.builderVendorUnmin = [
  './src/bower_components/cloudinary/js/jquery.ui.widget.js'
  './src/bower_components/cloudinary/js/jquery.iframe-transport.js'
  './src/bower_components/cloudinary/js/jquery.fileupload.js'
  './src/bower_components/jquery.cloudinary.1.0.21.js'
]

### MODULE ###
sources.appModule = [
  # Definitions
  './src/ee-shared/core/core.module.coffee'
  './src/ee-shared/core/constants.coffee'
  './src/ee-shared/core/filters.coffee'
  './src/ee-shared/core/config.coffee'
  './src/ee-shared/core/run.coffee'
  # Services
  './src/ee-shared/core/svc.modal.coffee'
]
sources.builderModule = [
  # Definitions
  './src/builder/builder.index.coffee'
  './src/builder/core/core.module.coffee'
  './src/builder/core/run.coffee'
  # Services
  './src/builder/core/svc.auth.coffee'
  './src/builder/core/svc.back.coffee'
  './src/builder/core/svc.definer.coffee'
  './src/builder/core/svc.cart.coffee'
  './src/builder/core/svc.user.coffee'
  './src/builder/core/svc.landing.coffee'
  './src/builder/core/svc.product.coffee'
  './src/builder/core/svc.products.coffee'
  './src/builder/core/svc.storeproduct.coffee'
  './src/builder/core/svc.storeproducts.coffee'
  './src/builder/core/svc.collection.coffee'
  './src/builder/core/svc.collections.coffee'
  './src/builder/core/svc.orders.coffee'
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
  # Contact
  './src/builder/contact/contact.module.coffee'
  './src/builder/contact/contact.controller.coffee'
  # Module - landing
  './src/builder/landing/landing.module.coffee'
  './src/builder/landing/landing.route.coffee'
  './src/builder/landing/landing.controller.coffee'
  # Module - example
  './src/builder/example/example.module.coffee'
  './src/builder/example/example.route.coffee'
  './src/builder/example/example.controller.coffee'
  # Module - go
  './src/builder/go/go.module.coffee'
  './src/builder/go/go.route.coffee'
  './src/builder/go/go.controller.coffee'
  # Module - is
  './src/builder/is/is.module.coffee'
  './src/builder/is/is.route.coffee'
  './src/builder/is/is.controller.coffee'
  # Module - create
  './src/builder/create/create.module.coffee'
  './src/builder/create/create.route.coffee'
  './src/builder/create/create.controller.coffee'
  # Module - edit
  './src/builder/edit/edit.module.coffee'
  './src/builder/edit/edit.route.coffee'
  './src/builder/edit/edit.controller.coffee'
  # Module - promotions
  './src/builder/promotions/promotions.module.coffee'
  './src/builder/promotions/promotions.route.coffee'
  './src/builder/promotions/promotions.controller.coffee'
  # Module - terms
  './src/builder/terms/terms.module.coffee'
  './src/builder/terms/terms.route.coffee'
  './src/builder/terms/terms.controller.coffee'
  './src/builder/terms/terms.modal.controller.coffee'
  # Module - storefront
  './src/builder/storefront/storefront.module.coffee'
  './src/builder/storefront/storefront.route.coffee'
  './src/builder/storefront/storefront.controller.coffee'
  # Module - products
  './src/builder/products/products.module.coffee'
  './src/builder/products/products.route.coffee'
  './src/builder/products/products.controller.coffee'
  './src/builder/products/product.controller.coffee'
  # Module - storeproducts
  './src/builder/storeproducts/storeproducts.module.coffee'
  './src/builder/storeproducts/storeproducts.route.coffee'
  './src/builder/storeproducts/storeproduct.controller.coffee'
  './src/builder/storeproducts/storeproducts.controller.coffee'
  # # Module - selections
  # './src/builder/selections/selections.module.coffee'
  # './src/builder/selections/selections.route.coffee'
  # './src/builder/selections/selections.controller.coffee'
  # './src/builder/selections/selection.view.controller.coffee'
  # Module - collections
  './src/builder/collections/collections.module.coffee'
  './src/builder/collections/collections.route.coffee'
  './src/builder/collections/collection.controller.coffee'
  './src/builder/collections/collections.controller.coffee'
  # Module - orders
  './src/builder/orders/orders.module.coffee'
  './src/builder/orders/orders.route.coffee'
  './src/builder/orders/orders.controller.coffee'
  # Module - account
  './src/builder/account/account.module.coffee'
  './src/builder/account/account.route.coffee'
  './src/builder/account/account.controller.coffee'
]

### DIRECTIVES ###
sources.builderDirective = [
  # TODO remove seller & privacy directives
  './src/ee-shared/components/ee-terms-seller.coffee'
  './src/ee-shared/components/ee-terms-privacy.coffee'
  './src/ee-shared/components/ee-builder-navbar.coffee'
  './src/ee-shared/components/ee-builder-section-heading.coffee'
  './src/ee-shared/components/ee-storeproduct-card.coffee'
  './src/ee-shared/components/ee-storeproduct-editor-card.coffee'
  './src/ee-shared/components/ee-storeproduct-for-storefront.coffee'
  './src/ee-shared/components/ee-storeproducts-in-collection.coffee'
  './src/ee-shared/components/ee-product-images.coffee'
  './src/ee-shared/components/ee-collection-card.coffee'
  './src/ee-shared/components/ee-collection-editor-card.coffee'
  './src/ee-shared/components/ee-save.coffee'
  './src/ee-shared/components/ee-loading.coffee'
  './src/ee-shared/components/ee-collection-nav.coffee'
  './src/ee-shared/components/ee-order.coffee'
  './src/ee-shared/components/ee-cloudinary-upload.coffee'
  './src/ee-shared/components/ee-image-preload.coffee'
  './src/ee-shared/components/ee-storefront-header.coffee'
  './src/ee-shared/components/ee-scroll-to-top.coffee'
  './src/ee-shared/components/ee-empty-message.coffee'
]

module.exports = sources
