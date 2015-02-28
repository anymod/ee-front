'use strict'

angular.module('builder.orders').controller 'builder.ordersCtrl', ($scope, eeOrders, eeAuth, eeStorefront) ->
  $scope.orders = []
  $scope.storefront = {}
  $scope.foo = 'bar'

  eeAuth.getUsername()
  .then (username) -> eeStorefront.storefrontFromUsername(username)
  .then (storefront) ->
    $scope.storefront = storefront
    eeOrders.getOrders { storefront: storefront }
  .then (orders) -> $scope.orders = orders
  .catch (err) -> console.error err

  return
