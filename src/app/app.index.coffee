'use strict'

angular.module 'eeApp', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'ngSanitize'
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
  'ee-navbar'
  'ee-save'
  'ee-offscreen'
  'ee-product'
  'ee-order'
  'ee-cloudinaryUpload'
  # 'EE.Templates' # commented out during build step for inline templates
]
