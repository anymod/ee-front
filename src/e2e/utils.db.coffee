process.env.NODE_ENV = 'test'
sequelize = require './utils.sequelize'

utils = {}

if process.env.NODE_ENV is 'test'

  utils.delete_all_tables = () ->
    utils.delete_all_users()
    utils.delete_all_products()
    utils.delete_all_selections()
    utils.delete_all_orders()

  utils.delete_all_users = () ->
    sequelize.query 'delete from "Users"', null, { raw: true }
      .success (data) -> console.log 'Deleted all users'

  utils.delete_all_products = () ->
    sequelize.query 'delete from "Products"', null, { raw: true }
      .success (data) -> console.log 'Deleted all products'

  utils.delete_all_selections = () ->
    sequelize.query 'delete from "Selections"', null, { raw: true }
      .success (data) -> console.log 'Deleted all selections'

  utils.delete_all_orders = () ->
    sequelize.query 'delete from "Orders"', null, { raw: true }
      .success (data) -> console.log 'Deleted all orders'

  # utils.create_admin_user =

utils.delete_all_tables()

module.exports = utils
