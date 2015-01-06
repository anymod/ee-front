module = angular.module 'E.Products', []

module.controller 'productsCtrl', ($scope, $stateParams, $location, $window, eFirebaseSvc, eProductData, eEnvSvc) ->
  eFirebaseSvc.redirectUnlessAuth()
  $scope.id = $stateParams.id

  $scope.createProduct = (product) ->
    eFirebaseSvc.createProduct product
      .then (data) -> $location.path('products/all'); console.log 'created product', product; return
      .catch (err) -> alert "failed to create product, err = #{err}"; return
      return
  $scope.updateProduct = ->
    eFirebaseSvc.updateProduct $scope.id, $scope.product
      .then (data) -> $location.path('products/all'); console.log 'updated product', $scope.product; return
      .catch (err) -> alert "failed to update product, err = #{err}"; return
      return
  $scope.deleteProduct = ->
    deleteProd = $window.confirm "Are you sure you want to delete this?"
    console.log deleteProd
    if deleteProd
      eFirebaseSvc.deleteProduct $scope.id
        .then (data) -> $location.path('products/all'); console.log 'deleted product', $scope.id; return
        .catch (err) -> alert "failed to delete product, err = #{err}"; return
    return

  $scope.env = eFirebaseSvc.getFirebaseEnv() || eEnvSvc.envFromHost()
  $scope.$watch 'env', (newEnv) ->
    if eFirebaseSvc.getFirebaseEnv() != newEnv
      eFirebaseSvc.setRef newEnv
      if $scope.products then eFirebaseSvc.getProducts('admin').then (data) -> $scope.products = data
    return

  if $scope.id == "all"
    $scope.products = eProductData
  else if $scope.id == "new"
    $scope.new = true
  else
    eFirebaseSvc.getProduct($scope.id).then (data) -> $scope.product = data

  return
