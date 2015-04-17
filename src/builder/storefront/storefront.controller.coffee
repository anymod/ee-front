'use strict'

angular.module('builder.storefront').controller 'storefrontCtrl', ($scope, eeAuth, eeStorefront) ->

  ## Setup
  that = this

  eeAuth.fns.defineUser()
  .then (user) ->
    that.user               = user
    that.product_selection  = eeStorefront.storefront.product_selection
    that.categories         = eeStorefront.data.categories
    $scope.carousel         = user.storefront_meta.home.carousel[0]

  return
