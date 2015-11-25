'use strict'

angular.module('builder.dashboard').config ($stateProvider) ->

  $stateProvider

    .state 'dashboard',
      url: '/dashboard'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/dashboard/dashboard.header.html'
        top:
          controller: 'dashboardCtrl as dashboard'
          templateUrl: 'builder/dashboard/dashboard.html'
        # footer:
        #   controller: 'storefrontCtrl as storefront'
        #   templateUrl: 'ee-shared/storefront/storefront.footer.html'
      data:
        pageTitle:        'Your store | eeosk'
        pageDescription:  'Preview and navigate your eeosk.'
        padTop:           '60px'

  return
