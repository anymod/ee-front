'use strict'

angular.module('app.core').run ($rootScope, $state, $cookies, $location, eeBack) ->

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state


  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    openStates = [
      'landing',
      'login',
      'logout',
      'about',
      'signup'
    ]
    unless openStates.indexOf(toState.name) > -1 or eeBack.hasToken()
      event.preventDefault()
      $state.go 'login'

  $rootScope.eeUser =
    storefront:
      categories: {
        'New Arrivals'
        'Home Decor'
        'Paper'
        'Bags'
        'Jewelry'
        'Accessories'
        'Vintage'
        'Apparel'
      }
      home:
        name: 'Common Deer VT'
        topBarColor: '#f6f6f6'
        topBarBackgroundColor: '#222222'
        carousel:
          1:
            imgUrl: 'http://cdn.shopify.com/s/files/1/0269/1895/t/2/assets/slideshow_6.jpg?5116'
            headline: 'TOPO DESIGNS'
            byline: 'OUR FAVORITE PACKS'
            btnText: 'SHOP NOW'
            btnPosition: 'right'
            linkCategory: 'Bags'
      shop: {}
      blog:
        url: 'http://www.myblog.com'
      about: {}
      audience:
        social:
          facebook: 'CommonDeer'
          pinterest: 'commondeer'
          twitter: 'commondeervt'
          instagram: 'commondeer'
        contact:
          email: 'info@commondeervt.com'
          address:
            street1: '5224 Shelburne Rd'
            street2: 'Suite 102'
            city: 'Shelburne'
            state: 'VT'
            zip: '05482'
        newsletterSignup: true

  return
