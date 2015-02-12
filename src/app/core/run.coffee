'use strict'

angular.module('app.core').run ($rootScope, $state, $cookies, $location, eeAuth, eeStorefront) ->

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state

  openStates = [
    'landing',
    'login',
    'about',
    'signup'
  ]

  isRestricted = (state) -> openStates.indexOf(state) < 0

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    eeStorefront.setCategories()

    # redirect to login if no token and restricted
    if !eeAuth.hasToken() and isRestricted(toState.name)
      event.preventDefault()
      $state.go 'login'
      return

    # redirect to storefront if token and unrestricted
    if eeAuth.hasToken() and !isRestricted(toState.name)
      event.preventDefault()
      $state.go 'app.storefront.home'
      return

  return
