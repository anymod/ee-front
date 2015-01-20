module = angular.module 'EE.Products', []

module.controller 'productsCtrl', ($scope, $stateParams, $location, $window, eeFirebaseSvc, eeProductData, eeEnvSvc) ->
  eeFirebaseSvc.redirectUnlessAuth()
  $scope.id = $stateParams.id

  $scope.createProduct = (product) ->
    eeFirebaseSvc.createProduct product
      .then (data) -> $location.path('products/all'); console.log 'created product', product; return
      .catch (err) -> alert "failed to create product, err = #{err}"; return
      return
  $scope.updateProduct = ->
    eeFirebaseSvc.updateProduct $scope.id, $scope.product
      .then (data) -> $location.path('products/all'); console.log 'updated product', $scope.product; return
      .catch (err) -> alert "failed to update product, err = #{err}"; return
      return
  $scope.deleteProduct = ->
    deleteProd = $window.confirm "Are you sure you want to delete this?"
    console.log deleteProd
    if deleteProd
      eeFirebaseSvc.deleteProduct $scope.id
        .then (data) -> $location.path('products/all'); console.log 'deleted product', $scope.id; return
        .catch (err) -> alert "failed to delete product, err = #{err}"; return
    return

  $scope.env = eeFirebaseSvc.getFirebaseEnv() || eeEnvSvc.envFromHost()
  $scope.$watch 'env', (newEnv) ->
    if eeFirebaseSvc.getFirebaseEnv() != newEnv
      eeFirebaseSvc.setRef newEnv
      if $scope.products then eeFirebaseSvc.getProducts('admin').then (data) -> $scope.products = data
    return

  if $scope.id == "all"
    $scope.products = eeProductData
  else if $scope.id == "new"
    $scope.new = true
  else
    eeFirebaseSvc.getProduct($scope.id).then (data) -> $scope.product = data

  return
