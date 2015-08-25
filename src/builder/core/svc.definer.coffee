'use strict'

angular.module('builder.core').factory 'eeDefiner', ($rootScope, eeAuth, eeLanding, eeUser, eeStoreProducts, eeCollections) ->

  ## SETUP
  _isBuilder = $rootScope.isBuilder
  _isStore   = $rootScope.isStore
  _loggedIn  = eeAuth.fns.hasToken()
  _loggedOut = !_loggedIn

  _exports =
    User:           eeUser.data
    Collections:    eeCollections.data
    StoreProducts:  eeStoreProducts.data
    meta:           {}
    carousel:       {}
    about:          {}
    product_ids:    []
    categories:     ['All']
    logged_in:      _loggedIn
    loading:        {}
    blocked:        {}
    unsaved:        false

  ## PRIVATE FUNCTIONS
  _collectionsArray = (collections) ->
    collections ||= {}
    array = []
    array.push c for c in Object.keys(collections)
    array

  _fillExportData = (user, data) ->
    _exports.user           = user
    _exports.meta           = user.storefront_meta
    _exports.carousel       = user.storefront_meta?.home?.carousel[0]
    _exports.about          = user.storefront_meta?.about
    _exports.product_ids    = data.product_ids
    _exports.categories     = data.categories
    _exports.logged_in      = eeAuth.fns.hasToken()

  _defineLoggedIn = () ->
    console.info '_defineLoggedIn'
    _exports.logged_in  = true
    _exports.loading    = true
    _exports.blocked    = false
    eeAuth.fns.defineUserFromToken()
    # TODO define user, storeProducts, and collections as needed
    # eeUser.fns.defineUser()
    # eeStoreProduct.fns.defineStoreProducts()

    # .then     () -> eeStorefront.fns.defineStorefrontFromToken()
    # .then     () -> _fillExportData eeAuth.exports.user, eeStorefront.data
    .catch (err) -> return # console.error err
    .finally  () -> _exports.loading = false

  _defineLanding = () ->
    console.info '_defineLanding'
    _exports.logged_in  = false
    _exports.loading    = false
    _exports.blocked    = true
    # _fillExportData {}, eeStorefront.data

  # _defineCustomerStore = () ->
  #   console.info '_defineCustomerStore'
  #   _exports.logged_in  = false
  #   _exports.loading    = true
  #   _exports.blocked    = false
  #   eeStorefront.fns.defineCustomerStore()
  #   .then  (res) -> _fillExportData res, eeStorefront.data
  #   .catch (err) -> console.error err
  #   .finally  () -> _exports.loading = false

  ## DEFINITION LOGIC
  # if _isStore                   then _defineCustomerStore()
  if _isBuilder and _loggedIn   then _defineLoggedIn()
  if _isBuilder and _loggedOut  then _defineLanding()

  $rootScope.$on 'definer:login',     () -> _defineLoggedIn()
  $rootScope.$on 'definer:logout',    () -> _defineLanding()

  ## EXPORTS
  exports: _exports