'use strict'

angular.module('builder.catalog').controller 'builder.catalogOffscreenCtrl', ($scope, $rootScope, $location, eeCatalog) ->

  ## Setup
  $scope.narrowToggle = true
  $scope.offscreenCategory = 'Catalog'
  $scope.offscreenColor = 'gold'
  $scope.page = 1
  $scope.categories = [
    'Home Decor',
    'Kitchen',
    'Accessories',
    'Health & Beauty',
    'Electronics',
    'General Merchandise'
  ]
  $scope.ranges = [
    { min: 0,     max: 2500   },
    { min: 2500,  max: 5000   },
    { min: 5000,  max: 10000  },
    { min: 10000, max: 20000  },
    { min: 20000, max: null   }
  ]
  ##

  ## Setup
  setHighlightedProduct = (prod) -> $scope.product = prod
  $rootScope.$on 'highlight:product', (e, id) ->
    eeCatalog.getProduct(id)
    .then (product) ->
      setHighlightedProduct product
    .catch () ->
      setHighlightedProduct {}
    return

  $scope.testFunc = () ->
    console.log 'loaded!'
