'use strict'

angular.module('builder.catalog').controller 'builder.catalogCtrl', ($scope, $rootScope, $anchorScroll, $location, eeCatalog) ->
  ## Setup
  $scope.narrowToggle = true
  $scope.offscreenCategory = 'Catalog'
  $scope.offscreenColor = 'gold'
  $scope.page = 1
  $scope.categories = [
    'Home Decor',
    'Kitchen',
    'Accessories',
    'Health & Beauty',
    'Electronics',
    'General Merchandise'
  ]
  $scope.ranges = [
    { min: 0,     max: 2500   },
    { min: 2500,  max: 5000   },
    { min: 5000,  max: 10000  },
    { min: 10000, max: 20000  },
    { min: 20000, max: null   }
  ]
  ##

  $scope.currentCategory = null
  $scope.setCurrentCategory = (category) ->
    $scope.currentCategory = if $scope.currentCategory is category then null else category
    eeCatalog.addQuery 'categories', [$scope.currentCategory]
    eeCatalog.addQuery 'page', 1
    # eeCatalog.logQuery()
    eeCatalog.search()

  $scope.currentRange = {}
  $scope.setCurrentRange = (range) ->
    $scope.currentRange = if $scope.currentRange.min is range.min then {} else range
    eeCatalog.addQuery 'min', $scope.currentRange.min
    eeCatalog.addQuery 'max', $scope.currentRange.max
    eeCatalog.addQuery 'page', 1
    # eeCatalog.logQuery()
    eeCatalog.search()


  ## Formerly directive
  $scope.toggleOffscreenRight = () ->
    $rootScope.toggleRight = !$rootScope.toggleRight
  $scope.query = eeCatalog.getQuery()
  $scope.$on 'storefront:updated', (e, data) -> $scope.storefront = data
  $scope.$on '$stateChangeSuccess', (event, toState) -> $scope.toggle = $rootScope.toggle
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

  eeCatalog.search()

  $scope.scrollToTop = () ->
    $location.hash 'top'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()

  changePageBy = (n) ->
    $scope.page += n
    if $scope.page <= 1 then $scope.page = 1
    eeCatalog.addQuery('page', $scope.page)
    eeCatalog.search()

  $scope.incrementPage = () -> changePageBy(1)
  $scope.decrementPage = () -> changePageBy(-1)

  return
