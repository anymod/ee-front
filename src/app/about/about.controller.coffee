'use strict'

angular.module('app.about').controller 'aboutCtrl', ($scope, eeProductData) ->
  # $scope.products = lodash.sample eeProductData, 10
  $scope.sellerPrice = 3
  $scope.examplePrice = 50
  $scope.slidePos = 'slide-1'
  return
