'use strict'

angular.module('app.orders')
  .controller 'app.ordersCtrl', ($scope, $rootScope, eeOrderData) ->
    $rootScope.toggle = true
    $scope.orders = eeOrderData
    return
