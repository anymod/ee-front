'use strict'

angular.module('builder.core').run ($rootScope, $state, $location, $cookies, eeAuth, eeUser) ->
  $rootScope.isBuilder = true
  $rootScope.isProduction = $location.host() isnt 'localhost' and $location.host().indexOf('heroku') < 0
  $rootScope.initialRequest = {}

  ## Keen.js
  Keen.ready () ->
    $rootScope.keenio = new Keen
      projectId: "565c9b27c2266c0bb36521db",
      readKey: "2e6b0efec92fef795b3f2f42cb77f8f9d9f07e6db31afdd27cf1b296657edeb9c7b3e4dccbe0019587d5b7e6b2221fb669114f7afa7813f081c3414df1a06b33bbd2fd26d71df0fa88f194dce9281c15b825dcd803fd61c824b8c45701cbe61c46e00cc4df1ca908f322b8f5ca60e856",
      writeKey: 'a36f4230d8a77258c853d2bcf59509edc5ae16b868a6dbd8d6515b9600086dbca7d5d674c9307314072520c35f462b79132c2a1654406bdf123aba2e8b1e880bd919482c04dd4ce9801b5865f4bc95d72fbe20769bc238e1e6e453ab244f9243cf47278e645b2a79398b86d7072cb75c'
      # protocol: 'https',          # String (optional: https | http | auto)
      # host: 'api.keen.io/3.0',    # String (optional)
      # requestType: 'jsonp'        # String (optional: jsonp, xhr, beacon)

    Keen.Spinner.defaults =
      # via https://github.com/keen/keen-js/blob/master/src/dataviz/adapters/keen-io.js#L33
      color: '#0286C2'              # #rgb or #rrggbb or array of colors
      height: 150
      width: 3
      className: 'keen-spinner'     # The CSS class to assign to the spinner
      zIndex: 500                   # The z-index (defaults to 2000000000)

  openStates = [
    'landing'
    'welcome'
    'welcome_proposition'
    'ref_proposition'
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
    'collectionpreview'
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
    if loggedOut and needsAuth(toState.name)
      $rootScope.initialRequest = { toState: toState, toParams, toParams, redirected: true }
      return stopAndRedirectTo('login')
    # redirect to storefront if logged in and unrestricted
    if loggedIn and isOpen(toState.name) and !isDual(toState.name) then return stopAndRedirectTo('daily')
    # redirect to /edit/topbar from /edit
    if toState.name is 'edit' then return stopAndRedirectTo('editdesign')
    # redirect to /promotions/social from /promotions
    if toState.name is 'promotions' then return stopAndRedirectTo('promotions.blog')

    return

  $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
    if eeAuth.fns.hasToken()
      keenio =
        user:       eeAuth.fns.getKeen()
        username:   eeAuth.fns.getUsername()
        url:        $location.absUrl()
        path:       $location.path()
        toState:    toState?.name
        toParams:   toParams
        fromState:  fromState?.name
        fromParams: fromParams
        _ga:        $cookies.get('_ga')
        _gat:       $cookies.get('_gat')

      Keen.ready () ->
        if $rootScope.isProduction and keenio.user then $rootScope.keenio.addEvent 'builder', keenio, (err, res) -> return
    return

  return
