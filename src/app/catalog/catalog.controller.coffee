'use strict'

angular.module('app.catalog')
  .controller 'app.catalogCtrl', ($scope, $rootScope, products) ->
    $rootScope.toggle = true
    $scope.products = products
    return
