'use strict'

angular.module 'eeApp', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'angulartics'
  'angulartics.google.analytics'
  'colorpicker.module'
  'angularFileUpload'

  # controllers
  'app.core'
  'app.auth'
  'app.landing'
  'app.about'
  'app.contact'
  'app.storefront'
  'app.catalog'
  'app.orders'
  'app.account'

  # custom
  # 'EE.Products'
  # 'EE.SupplierSignup'
  'ee-navbar'
  'ee-save'
  'ee-offscreen'
  'ee-productForCatalog'
  'ee-productForStorefront'
  'ee-productNav'
  'ee-productForOverlay'
  'ee-order'
  'ee-cloudinaryUpload'
  # 'EE.Templates' # commented out during build step for inline templates
]
