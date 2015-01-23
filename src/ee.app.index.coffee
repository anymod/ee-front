'use strict'

angular.module 'eeApp', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'angulartics'
  'angulartics.google.analytics'
  'colorpicker.module'

  # controllers
  'app.core'
  'app.landing'
  'app.catalog'

  # custom
  # 'EE.Products'
  # 'EE.Previewer'
  # 'EE.ProductEditor'
  # 'EE.SupplierSignup'
  'ee-navbar'
  'ee-offscreen'
  'ee-catalogProduct'
  'ee-storefrontProduct'
  'ee-order'
  # 'EE.Templates' # commented out during build step for inline templates
]
