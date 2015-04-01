'use strict'

angular.module('builder.catalog').controller 'builder.catalog.offscreenCtrl', ($scope, $rootScope, $location, user, eeAuth, eeCatalog, eeSelection, eeStorefront) ->
  ## Setup definitions
  $scope.user = user
  # Search
  $scope.categoryArray      = eeCatalog.categoryArray
  $scope.rangeArray         = eeCatalog.rangeArray
  $scope.marginArray        = eeCatalog.marginArray
  # Offscreen product
  basePrice                 = null
  $scope.currentPrice       = null
  $scope.currentMargin      = null
  $scope.addBtnText         = 'Add to store'
  $scope.removeBtnText      = 'Remove from my store'
  $scope.addBtnDisabled     = false
  $scope.removeBtnDisabled  = false
  ##

  ## Setup functions
  # Respond to searches
  $scope.$on 'catalog:search:started', () -> $scope.searching  = true
  $scope.$on 'catalog:search:ended', (e, data) ->
    console.log 'search ended', data
    $scope.searching = false
    # offscreen scope only needs search params
    $scope.search   = data.search
    $scope.min      = data.min
    $scope.max      = data.max
    $scope.category = data.category
    $scope.storefront_product_ids = data.storefront_product_ids
  # Generate searches
  $scope.setCategory  = (category) ->
    $scope.category = category
    eeCatalog.setCategory category
  $scope.setRange = (range) ->
    $scope.min = range.min
    $scope.max = range.max
    eeCatalog.setRange range

  # Offscreen product
  # TODO finish catalog offscreen for product focus
  setProduct          = (prod) -> $scope.product = prod
  clearProduct        = () -> setProduct {}
  # $scope.update       = (newMargin) -> eeCatalog.setCurrents $scope, basePrice, newMargin
  $scope.setFocusImg  = (img) -> $scope.focusImg = img
  initializeProduct   = (prod) ->
    setProduct prod
    basePrice = $scope.product.baseline_price
    $scope.setFocusImg prod.image_meta.main_image
    $scope.update eeCatalog.startMargin
  nullProduct = () -> initializeProduct { loading: true, image_meta: main_image: '' }

  ## Focus product
  # $scope.$on 'product:focus', (e, id) ->
    # $scope.setFocusImg null
    # nullProduct()
    # eeCatalog.getProduct(id)
    # .then (product) ->
      # initializeProduct product
      # console.log '$scope.product', $scope.product
    # .catch () -> nullProduct()

  ## Add to store
  $scope.select = () ->
    $scope.addBtnText     = 'Adding'
    $scope.addBtnDisabled = true
    eeSelection.createSelection($scope.product, $scope.currentMargin*100)
    .then () -> eeStorefront.storefrontFromUsername($scope.user.username, true)
    .then () -> eeStorefront.defineForCatalog $scope, $scope.user.username
    .then () ->
      $scope.addBtnText = 'Add to store'
      $rootScope.$broadcast 'catalog:updated'
    .catch (err) ->
      $scope.addBtnText = 'Unable to add'
      console.error err
    .finally () -> $scope.addBtnDisabled = false
  ##

  ## Remove from store
  $scope.deselect = () ->
    $scope.removeBtnText      = 'Removing'
    $scope.removeBtnDisabled  = true
    selection_id = $scope.productLookup[$scope.product.id].selection_id
    eeSelection.deleteSelection(selection_id)
    .then () -> eeStorefront.storefrontFromUsername($scope.user.username, true)
    .then () -> eeStorefront.defineForCatalog $scope, $scope.user.username
    .then () -> $scope.removeBtnText = 'Remove from my store'
    .catch (err) ->
      $scope.removeBtnText = 'Didn\'t remove from store'
      console.error err
    .finally () -> $scope.removeBtnDisabled = false
  ##



  return
