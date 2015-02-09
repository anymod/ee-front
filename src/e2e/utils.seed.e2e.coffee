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
  scope.token = body.token.replace('Bearer ', 'Bearer%20')
  utils.create_products(10)
.then (products) ->
  ## TODO get selection creation working (without need for explicit seller_id)
  utils.create_selections((_.pluck products, 'id'), scope.token)
