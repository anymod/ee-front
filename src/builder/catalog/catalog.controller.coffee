'use strict'

angular.module('builder.catalog').controller 'builder.catalogCtrl', ($scope, $location, eeCatalog) ->

  $scope.currentCategory = null
  $scope.setCurrentCategory = (category) ->
    $scope.currentCategory = if $scope.currentCategory is category then null else category
    eeCatalog.addQuery 'categories', [$scope.currentCategory]
    eeCatalog.addQuery 'page', 1
    # eeCatalog.logQuery()
    eeCatalog.search()
    return

  $scope.currentRange = {}
  $scope.setCurrentRange = (range) ->
    $scope.currentRange = if $scope.currentRange.min is range.min then {} else range
    eeCatalog.addQuery 'min', $scope.currentRange.min
    eeCatalog.addQuery 'max', $scope.currentRange.max
    eeCatalog.addQuery 'page', 1
    setHighlightedProduct { foo: 'bar', page: Math.random() }
    # eeCatalog.logQuery()
    eeCatalog.search()
    return


  ## Formerly directive
  $scope.query = eeCatalog.getQuery()
  $scope.$on 'storefront:updated', (e, data) -> $scope.storefront = data
  $scope.$on 'auth:user:updated', (e, data) -> $scope.user = data
  $scope.$on 'catalog:query:updated', () -> $scope.query = eeCatalog.getQuery()
  $scope.$on 'catalog:products:updated',  () -> $scope.products = eeCatalog.getProducts()
  $scope.$on 'catalog:search:started',    () -> $scope.searching = true
  $scope.$on 'catalog:search:ended',      () ->
    $scope.searching = false
    $scope.page = eeCatalog.getQuery().page || 1

  # $scope.currentRanges = []
  #
  # $scope.categoryIsCurrent = (category) -> $scope.currentCategories.indexOf(category) > -1
  #
  # $scope.toggleCurrentCategory = (category) ->
  #   index = $scope.currentCategories.indexOf category
  #   if index > -1 then $scope.currentCategories.splice(index, 1) else $scope.currentCategories.push category
  #   eeCatalog.addQuery 'categories', $scope.currentCategories.join(',')
  #   eeCatalog.addQuery 'page', 1
  #   # eeCatalog.logQuery()
  #   eeCatalog.search()
  #
  # fillCurrentRanges = (min, max) ->
  #   $scope.currentRanges = []
  #   pushRange = (r) ->
  #     if r.min >= min and ((r.max <= max and r.max isnt null) or max is null)
  #       $scope.currentRanges.push r
  #   pushRange r for r in $scope.ranges
  #
  # setMinMax = (min, max) ->
  #   eeCatalog.addQuery 'min', min
  #   eeCatalog.addQuery 'max', max
  #   eeCatalog.addQuery 'page', 1
  #   # eeCatalog.logQuery()
  #   eeCatalog.search()
  #
  # translateRanges = () ->
  #   [mins, maxs] = [[],[]]
  #   $scope.currentRanges.map (r) ->
  #     mins.push r.min
  #     maxs.push r.max
  #   min = Math.min.apply null, mins
  #   max = Math.max.apply null, maxs
  #   if maxs.indexOf(null) > -1 then max = null
  #   fillCurrentRanges min, max
  #   setMinMax min, max
  #
  # $scope.rangeIsCurrent = (range) -> $scope.currentRanges.indexOf(range) > -1
  #
  # $scope.toggleCurrentRange = (range) ->
  #   index = $scope.currentRanges.indexOf range
  #   if index > -1 then $scope.currentRanges.splice(index, 1) else $scope.currentRanges.push range
  #   translateRanges()
  ##

  ## Highlighted product
  $scope.productFocus = (id) ->
    $scope.$emit 'highlight:product', id
    return
  ##

  eeCatalog.search()

  # $scope.scrollToTop = () ->
  #   $location.hash 'top'
  #   $anchorScroll()
  #   # Remove hash in url
  #   $location.url $location.path()

  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.addQuery('page', $scope.page)
    eeCatalog.search()

  $scope.incrementPage = () -> changePageBy(1)
  $scope.decrementPage = () -> changePageBy(-1)

  return
