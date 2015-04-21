'use strict'

angular.module('app.core').factory 'eeDefiner', ($rootScope, eeAuth, eeStorefront, eeLanding) ->

  ## SETUP
  _isBuilder          = $rootScope.isBuilder
  _isStore            = $rootScope.isStore
  _loggedIn           = eeAuth.fns.hasToken()
  _loggedOut          = !_loggedIn

  _exports =
    user:               {}
    meta:               {}
    carousel:           {}
    about:              {}
    product_selection:  []
    categories:         ['All']
    logged_in:          _loggedIn
    loading:            {}
    blocked:            {}

  ## PRIVATE FUNCTIONS
  _fillExportData = (user, data) ->
    _exports.user               = user
    _exports.meta               = user.storefront_meta
    _exports.carousel           = user.storefront_meta?.home?.carousel[0]
    _exports.about              = user.storefront_meta?.about
    _exports.product_selection  = data.product_selection || []
    _exports.categories         = data.categories || ['All']
    _exports.logged_in          = eeAuth.fns.hasToken()

  _defineLoggedIn = () ->
    console.info '_defineLoggedIn'
    _exports.loading = true
    _exports.blocked = false
    eeAuth.fns.defineUserFromToken()
    .then     () ->
      eeStorefront.fns.defineStorefrontFromToken()
      console.log eeAuth.user, eeStorefront.data
    .then     () -> _fillExportData eeAuth.user, eeStorefront.data
    .catch (err) -> console.error err
    .finally  () -> _exports.loading = false

  _defineLanding = () ->
    console.info '_defineLanding'
    _exports.loading = false
    _exports.blocked = true
    _fillExportData eeLanding.landingUser, eeLanding.landingStorefront

  _defineCustomerStore = () ->
    console.info '_defineCustomerStore'
    _exports.loading = true
    _exports.blocked = false
    eeStorefront.fns.defineCustomerStore()
    .then     () -> _fillExportData eeStorefront.user, eeStorefront.data
    .catch (err) -> console.error err
    .finally  () -> _exports.loading = false

  ## DEFINITION LOGIC
  if _isStore                   then _defineCustomerStore()
  if _isBuilder and _loggedIn   then _defineLoggedIn()
  if _isBuilder and _loggedOut  then _defineLanding()

  ## EXPORTS
  exports: _exports
  # user:               _exports.user
  # meta:               _exports.meta
  # carousel:           _exports.carousel
  # about:              _exports.about
  # product_selection:  _exports.product_selection
  # categories:         _exports.categories
  # loading:            _exports.loading
  # blocked:            _exports.blocked
