'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($scope, eeAuth, eeStorefront) ->

  ## Setup
  this.user               = eeAuth.fns.landingUser()
  this.product_selection  = eeStorefront.storefront.product_selection
  this.categories         = eeStorefront.data.categories
  $scope.carousel         = this.user.storefront_meta.home.carousel[0]

  ## Define storefront & categories
  # eeStorefront.fns.getStorefront(true)
  # .then (storefront) ->
  #   $scope.storefront = storefront
  return






# angular.module('builder.storefront').controller 'builder.storefront.offscreenCtrl', ($scope, $rootScope, $state, user, eeStorefront) ->
#   ## Setup
#   $scope.user = user
#
#   ## Define storefront & categories
#   eeStorefront.getStorefront(true)
#   .then (storefront) ->
#     $scope.storefront = storefront
#     eeStorefront.setScopeCategories(storefront, $scope)
#   return
