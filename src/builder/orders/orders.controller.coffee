'use strict'

angular.module('builder.orders').controller 'ordersCtrl', (user, eeOrders, eeStorefront) ->
  this.user = user
  this.orders = []
  this.storefront = {}
  this.hideCatalogAlert = true
  return
