'use strict'

angular.module('app.catalog')
  .controller 'app.catalogCtrl', ($scope, $rootScope, eeBack) ->
    $rootScope.toggle = true
    eeBack.getProducts().then (products) -> $scope.products = products
    return
