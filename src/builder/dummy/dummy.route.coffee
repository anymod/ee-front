'use strict'

angular.module('builder.catalog').config ($stateProvider) ->

  $stateProvider
    .state 'dummy',
      url: '/dummy-product-admin'
      views:
        top:
          controller: 'catalogCtrl as catalog'
          templateUrl: 'builder/dummy/dummy.html'
      data:
        pageTitle:     'Product Admin | eeosk'
