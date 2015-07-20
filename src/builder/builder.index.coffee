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
  'builder.contact'
  'builder.landing'
  'builder.go'
  'builder.is'
  'builder.create'
  'builder.terms'
  'builder.storefront'
  # 'builder.catalog'
  'builder.products'
  'builder.selections'
  'builder.collections'
  'builder.orders'
  'builder.account'
  'builder.example'
  'builder.edit'
  'builder.promote'

  # custom
  'ee-terms-seller'
  'ee-terms-privacy'
  'ee-builder-navbar'
  'ee-save'
  # 'ee-product'
  'ee-selection-editor-card'
  'ee-selection-for-storefront'
  'ee-shop-nav'
  'ee-selection-card'
  'ee-order'
  'ee-cloudinaryUpload'
  'ee-image-preload'
  'ee-storefront-header'
  'ee-scroll-to-top'
  # 'ee.templates' # commented out during build step for inline templates
]
