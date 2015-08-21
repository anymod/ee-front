'use strict'

angular.module('builder.collections').controller 'featuredCtrl', (eeDefiner, eeUser, eeCollection) ->

  featured = this

  featured.ee     = eeDefiner.exports
  featured.data   = eeCollection.data
  featured.fns    = eeCollection.fns

  # eeCollection.fns.searchFeatured().catch (err) -> $state.go 'collections'

  eeUser.fns.defineUser()

  return
