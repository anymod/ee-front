'use strict'

angular.module('builder.core').run ($rootScope, $state, $location, $stateParams, eeAuth, eeUser) ->
  $rootScope.isBuilder = true

  ## Keen.js
  keen = new Keen
    projectId: '565c9b27c2266c0bb36521db', # String (required always)
    writeKey: 'a36f4230d8a77258c853d2bcf59509edc5ae16b868a6dbd8d6515b9600086dbca7d5d674c9307314072520c35f462b79132c2a1654406bdf123aba2e8b1e880bd919482c04dd4ce9801b5865f4bc95d72fbe20769bc238e1e6e453ab244f9243cf47278e645b2a79398b86d7072cb75c',   # String (required for sending data)
    # readKey: 'YOUR_READ_KEY'    # String (required for querying data)
    # protocol: 'https',          # String (optional: https | http | auto)
    # host: 'api.keen.io/3.0',    # String (optional)
    # requestType: 'jsonp'        # String (optional: jsonp, xhr, beacon)

  openStates = [
    'landing'
    'welcome'
    'welcome_proposition'
    'login'
    'example'
    'go'
    'create'
    'create-finishing'
    'your-own-business'
    'easy-to-use'
    'everything-you-need'
    'beautiful-and-customizable'
  ]

  dualStates = [
    'faq'
    'terms'
    'privacy'
    'logout'
    'reset'
    'foothill'
  ]

  isOpen    = (state) -> openStates.indexOf(state) > -1
  isDual    = (state) -> dualStates.indexOf(state) > -1
  needsAuth = (state) -> !isOpen(state) && !isDual(state)

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    loggedIn  = eeAuth.fns.hasToken()
    loggedOut = !loggedIn

    if loggedIn then eeUser.fns.defineUser()

    stopAndRedirectTo = (state) ->
      event.preventDefault()
      $state.go state
      # If redirect loop: $state.go causes this with child state, so use $location.path for storefront instead. See https://github.com/angular-ui/ui-router/issues/1169
      return

    # redirect to login if logged out and restricted
    if loggedOut and needsAuth(toState.name) then return stopAndRedirectTo('login')
    # redirect to storefront if logged in and unrestricted
    if loggedIn and isOpen(toState.name) and !isDual(toState.name) then return stopAndRedirectTo('dashboard')
    # redirect to /edit/topbar from /edit
    if toState.name is 'edit' then return stopAndRedirectTo('edit.topbar')
    # redirect to /promotions/social from /promotions
    if toState.name is 'promotions' then return stopAndRedirectTo('promotions.blog')

    return

  # Keen.ready () ->
  $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
    tracking =
      # user:
      url:        $location.absUrl()
      path:       $location.path()
      toState:    toState?.name
      toParams:   toParams
      fromState:  fromState?.name
      fromParams: fromParams

    user = eeAuth.exports.user
    console.log user
    # keen.addEvent 'tracking_ping', tracking, (err, res) ->
    #   if err then console.log 'err', err
    #   if res then console.log 'res', res
    #   console.log tracking

    return

  return
