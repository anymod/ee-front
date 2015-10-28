'use strict'

angular.module('builder.products').controller 'productsCtrl', ($state, eeAuth, eeDefiner, eeProducts, eeCollections) ->

  products = this

  products.ee   = eeDefiner.exports
  products.fns  = eeProducts.fns
  products.collectionsFns = eeCollections.fns

  switch $state.current.name
    when 'productsAdd'
      if !products?.ee?.Products?.search?.products or products.ee.Products.search.products.length is 0 then eeProducts.fns.runSection('search')
      eeCollections.fns.search()
    when 'categories'
      if !products?.ee?.Products?.categories?.products or products.ee.Products.categories.products.length is 0 then eeProducts.fns.runSection('categories')
    when 'featured'
      if !products?.ee?.Products?.featured?.products or products.ee.Products.featured.products.length is 0 then eeProducts.fns.runSection('featured')

  return
