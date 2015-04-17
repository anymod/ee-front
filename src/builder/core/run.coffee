'use strict'

angular.module('builder.core').run ($rootScope, $state, $location, $anchorScroll, eeAuth) ->
  $rootScope.isBuilder = true

  nonAuthStates = [
    'landing'
    'login'
    'reset'
    'logout'
    'example'
    'try-theme'
    'try-storefront'
    'try-edit'
    'try-catalog'
  ]

  isTry     = (state) -> state.indexOf('try-') > -1
  isNonAuth = (state) -> nonAuthStates.indexOf(state) > -1

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    toName = toState.name

    if isTry(fromState.name) and !isTry(toName) and !isNonAuth(toName)
      event.preventDefault()
      toName = 'try-' + toName
      $state.go toName
      return

    # redirect to login if no token and restricted
    if !eeAuth.fns.hasToken() and !isNonAuth(toName)
      event.preventDefault()
      $state.go 'login'
      return

    # redirect to storefront if token and unrestricted
    if eeAuth.fns.hasToken() and isNonAuth(toName)
      # $state.go may cause redirect loop with child state; use $location.path if it does
      # https://github.com/angular-ui/ui-router/issues/1169
      $state.go 'storefront'
      return

  $rootScope.$on '$stateChangeSuccess', () ->
    $location.hash 'body-top'
    $anchorScroll()
    $location.url $location.path()

  return
