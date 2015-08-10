'use strict'

angular.module('builder.terms').config ($stateProvider) ->

  $stateProvider
    .state 'faq',
      url: '/faq'
      views:
        top:
          templateUrl: 'builder/terms/faq.html'
          controller: 'termsCtrl'
      data:
        pageTitle: 'Frequently Asked Questions | eeosk'

    .state 'terms',
      url: '/terms'
      views:
        top:
          templateUrl: 'builder/terms/terms.html'
          controller: 'termsCtrl'
      data:
        pageTitle: 'Terms & Conditions | eeosk'

    .state 'privacy',
      url: '/privacy'
      views:
        top:
          templateUrl: 'builder/terms/privacy.html'
          controller: 'termsCtrl'
      data:
        pageTitle: 'Privacy Policy | eeosk'
