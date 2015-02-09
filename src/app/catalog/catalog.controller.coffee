'use strict'

angular.module('app.catalog').controller 'app.catalogCtrl', ($scope, $rootScope, eeProduct) ->

    $rootScope.toggle = true
    eeProduct.getProducts().then (products) -> $scope.products = products
    return
