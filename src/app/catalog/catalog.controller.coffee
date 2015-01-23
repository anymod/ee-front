'use strict'

angular.module('app.catalog')
  .controller 'app.catalogCtrl', ($scope, $rootScope, eeProductData) ->
    $rootScope.toggle = true
    $scope.products = eeProductData
    return
