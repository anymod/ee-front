angular.module 'eeApp', [
  # vendor
  'ui.router'
  'ui.bootstrap'
  'ngCookies'
  'angulartics'
  'angulartics.google.analytics'
  'colorpicker.module'

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

  # controllers
  'app.landing'
]
