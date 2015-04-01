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
  # 'angularFileUpload'

  # core
  'app.core'

  # builder
  'builder.core'
  'builder.auth'
  'builder.landing'
  'builder.terms'
  'builder.storefront'
  'builder.catalog'
  'builder.orders'
  'builder.account'

  # custom
  'ee-terms-seller'
  'ee-terms-privacy'
  'ee-navbar'
  'ee-save'
  'ee-welcome'
  'ee-offscreen-toggle'
  'ee-offscreen-header'
  'ee-offscreen-footer'
  'ee-product'
  'ee-order'
  'ee-cloudinaryUpload'
  'ee-image-preload'
  'ee-storefront-header'
  'ee-storefront-footer'
  # 'ee.templates' # commented out during build step for inline templates
]
