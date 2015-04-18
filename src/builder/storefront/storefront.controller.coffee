'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($scope, user, eeAuth, eeStorefront) ->

  ## Setup
  this.user               = user
  this.product_selection  = eeStorefront.storefront.product_selection
  this.categories         = eeStorefront.data.categories
  $scope.carousel         = user.storefront_meta?.home?.carousel[0]

  return
