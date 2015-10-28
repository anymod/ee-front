'use strict'

angular.module('builder.core').factory 'eeDefiner', ($rootScope, eeAuth, eeLanding, eeUser, eeProducts, eeCollections) ->

  ## SETUP
  _isBuilder = $rootScope.isBuilder
  _isStore   = $rootScope.isStore
  _loggedIn  = eeAuth.fns.hasToken()
  _loggedOut = !_loggedIn

  _exports =
    User:           eeUser.data
    Collections:    eeCollections.data
    Products:       eeProducts.data
    meta:           {}
    carousel:       {}
    about:          {}
    template_ids:   []
    categories:     ['All']
    logged_in:      _loggedIn
    loading:        {}
    blocked:        {}
    unsaved:        false

  ## PRIVATE FUNCTIONS
  _resetData = () ->
    eeUser.data           = {}
    eeCollections.data    = {}
    eeProducts.data  = {}

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
    _exports.template_ids   = data.template_ids
    _exports.categories     = data.categories
    _exports.logged_in      = eeAuth.fns.hasToken()

  _defineLoggedIn = () ->
    console.info '_defineLoggedIn'
    _exports.logged_in  = true
    _exports.loading    = true
    _exports.blocked    = false
    eeAuth.fns.defineUserFromToken()
    .catch (err) -> return # console.error err
    .finally  () -> _exports.loading = false

  _defineLanding = () ->
    console.info '_defineLanding'
    _exports.logged_in  = false
    _exports.loading    = false
    _exports.blocked    = true
    _resetData()

  ## DEFINITION LOGIC
  if _isBuilder and _loggedIn   then _defineLoggedIn()
  if _isBuilder and _loggedOut  then _defineLanding()

  $rootScope.$on 'definer:login',     () -> _defineLoggedIn()
  $rootScope.$on 'definer:logout',    () -> _defineLanding()

  ## EXPORTS
  exports: _exports
