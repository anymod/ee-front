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

  isOpen = (state) -> openStates.indexOf(state) >= 0

  $rootScope.closeProductHighlight = () -> $location.search('p', null)

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    eeStorefront.setCategories()

    # redirect to login if no token and restricted
    if !eeAuth.hasToken() and !isOpen(toState.name)
      event.preventDefault()
      $state.go 'login'
      return

    # redirect to storefront if token and unrestricted
    if eeAuth.hasToken() and isOpen(toState.name)
      # $state.go causes redirect loop with child state, so using $location.path instead
      # https://github.com/angular-ui/ui-router/issues/1169
      $location.path '/storefront/home'
      return

  return
