'use strict'

angular.module('builder.core').run ($rootScope, $state, $location, eeAuth, eeStorefront) ->
  $rootScope.isBuilder = true
  $rootScope.$on 'toggle:offscreen:left', () ->
    $rootScope.toggleLeft = !$rootScope.toggleLeft
    $rootScope.$broadcast 'set:toggle:offscreen:left', $rootScope.toggleLeft
  $rootScope.$on 'toggle:offscreen:right', () ->
    $rootScope.toggleRight = !$rootScope.toggleRight
    $rootScope.$broadcast 'set:toggle:offscreen:right', $rootScope.toggleRight

  nonAuthStates = [
    'landing'
    'login'
    'signup'
  ]
  eitherAuthStates = [
    'logout'
    'about'
    'examples'
    'terms'
    'privacy'
    'reset'
  ]
  closeOffscreenStates = [
    'login'
    'logout'
    'landing'
    'signup'
    'examples'
    'reset'
    'terms'
    'privacy'
  ]

  isNonAuth = (state) -> nonAuthStates.indexOf(state) >= 0
  isEitherAuth = (state) -> eitherAuthStates.indexOf(state) >= 0
  isCloseOffscreen = (state) -> closeOffscreenStates.indexOf(state) >= 0

  $rootScope.closeProductHighlight = () -> $location.search('p', null)

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    eeStorefront.setCategories()

    # redirect to login if no token and restricted
    if !isEitherAuth(toState.name) and !eeAuth.hasToken() and !isNonAuth(toState.name)
      event.preventDefault()
      $state.go 'login'
      return

    # redirect to storefront if token and unrestricted
    if !isEitherAuth(toState.name) and eeAuth.hasToken() and isNonAuth(toState.name)
      # $state.go causes redirect loop with child state, so using $location.path instead
      # https://github.com/angular-ui/ui-router/issues/1169
      $location.path '/storefront/home'
      return

  $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
    $rootScope.toggleLeft = !isCloseOffscreen(toState.name)
    $rootScope.$broadcast 'set:toggle:offscreen:left', $rootScope.toggleLeft

  return
