'use strict'

angular.module('builder.core').run ($rootScope, $state, $location, $anchorScroll, eeAuth) ->
  $rootScope.isBuilder = true

  openStates = [
    'landing'
    'faq'
    'terms'
    'privacy'
    'welcome'
    'welcome_proposition'
    'login'
    'reset'
    'logout'
    'example'
    'go'
    'create'
    'create-finishing'
    'your-own-business'
    'easy-to-use'
    'everything-you-need'
    'beautiful-and-customizable'
    'foothill'
  ]

  isOpen    = (state) -> openStates.indexOf(state) > -1
  needsAuth = (state) -> !isOpen state

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    loggedIn  = eeAuth.fns.hasToken()
    loggedOut = !loggedIn

    stopAndRedirectTo = (state) ->
      event.preventDefault()
      $state.go state
      # If redirect loop: $state.go causes this with child state, so use $location.path for storefront instead. See https://github.com/angular-ui/ui-router/issues/1169
      return

    # redirect to login if logged out and restricted
    if loggedOut and needsAuth(toState.name) then return stopAndRedirectTo('login')
    # redirect to storefront if logged in and unrestricted
    if loggedIn and isOpen(toState.name) and toState.name isnt 'logout' and toState.name isnt 'reset' then return stopAndRedirectTo('storefront')
    # redirect to /edit/topbar from /edit
    if toState.name is 'edit' then return stopAndRedirectTo('edit.topbar')
    # redirect to /promotions/social from /promotions
    if toState.name is 'promotions' then return stopAndRedirectTo('promotions.blog')

    return

  return
