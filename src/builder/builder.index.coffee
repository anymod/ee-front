'use strict'

angular.module 'eeBuilder', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'ngSanitize'
  'angulartics'
  'angulartics.google.analytics'
  'colorpicker.module'
  'angularFileUpload'

  # core
  'app.core'

  # builder
  'builder.core'
  'builder.auth'
  'builder.landing'
  'builder.about'
  'builder.contact'
  'builder.storefront'
  'builder.catalog'
  'builder.orders'
  'builder.account'

  # custom
  'ee-navbar'
  'ee-save'
  'ee-offscreen'
  'ee-product'
  'ee-order'
  'ee-cloudinaryUpload'
  # 'EE.Templates' # commented out during build step for inline templates
]
