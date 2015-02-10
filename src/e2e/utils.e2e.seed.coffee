process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
_ = require 'lodash'

console.log "SEED"

scope = {}

utils.delete_all_tables()
.then () -> utils.create_admin()
.then () -> utils.create_user utils.random_user
.then (body) ->
  scope.user = body.user
  scope.token = body.token
  utils.create_products(10)
.then (products) ->
  utils.create_selections((_.pluck products, 'id'), scope.token)
.then () ->
  utils.create_products(100)
