process.env.NODE_ENV = 'test'
sequelize = require './utils.e2e.sequelize'
Promise   = require 'bluebird'
request   = require 'request'
jwt       = require 'jsonwebtoken'
_         = require 'lodash'

utils = {}
scope = {}

random_string       = () -> Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5)
random_string_const = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5)

utils.test_admin =
  username:       'test_admin'
  email:          'test_admin@foo.bar'
  password:       'foobarbaz'
  password_hash:  '$2a$05$YB1MyntOM2MHwODctZBy7O.GmpfrLm6xlZZxB30IpR3Ushi7auCaC'

utils.test_user =
  username:       'test_user'
  email:          'test_user@foo.bar'
  password:       'foobarbaz'
  password_hash:  '$2a$05$YB1MyntOM2MHwODctZBy7O.GmpfrLm6xlZZxB30IpR3Ushi7auCaC'

utils.random_user =
  username:       random_string_const
  email:          random_string_const + '@foo.bar'
  password:       'foobarbaz'
  password_hash:  '$2a$05$YB1MyntOM2MHwODctZBy7O.GmpfrLm6xlZZxB30IpR3Ushi7auCaC'


if process.env.NODE_ENV is 'test'

  utils.delete_all_tables = () ->
    utils.delete_all_users()
    .then () -> utils.delete_all_products()
    .then () -> utils.delete_all_selections()
    .then () -> utils.delete_all_orders()

  utils.delete_all_users = () ->
    new Promise (resolve, reject) ->
      sequelize.query 'delete from "Users"', null, { raw: true }
        .success (data) -> resolve data
        .error (err) -> reject err

  utils.delete_all_products = () ->
    new Promise (resolve, reject) ->
      sequelize.query 'delete from "Products"', null, { raw: true }
        .success (data) -> resolve data
        .error (err) -> reject err

  utils.delete_all_selections = () ->
    new Promise (resolve, reject) ->
      sequelize.query 'delete from "Selections"', null, { raw: true }
        .success (data) -> resolve data
        .error (err) -> reject err

  utils.delete_all_orders = () ->
    new Promise (resolve, reject) ->
      sequelize.query 'delete from "Orders"', null, { raw: true }
        .success (data) -> resolve data
        .error (err) -> reject err

  utils.create_user = (user) ->
    req = request.defaults
      json: true
      uri: browser.apiUrl + '/v0/users'
      body:
        username: user.username
        email:    user.email
        password: user.password
      headers: authorization: {}
    new Promise (resolve, reject) ->
      req.post {}, (err, res, body) ->
        last_user_created   = body.user
        last_token_created  = body.token
        if !!err then reject err else resolve body

  utils.create_admin = () ->
    utils.create_user utils.test_admin
    .then (body) ->
      scope.admin_token = body.token
      scope.admin_user = body.user
      sequelize.query 'UPDATE "Users" SET "admin"=true WHERE "username"=\'' + body.user.username + '\';'
      body

  utils.create_products = (n) ->
    createOps = []
    _.times n, (i) -> createOps.push(utils.create_product(i + 1))
    Promise.all(createOps)

  utils.create_product = (i) ->
    supply_price = parseInt(Math.random()*100)*100 + 800
    ee_margin = 10
    img_size = if Math.random() > 0.5 then '800x400' else '400x800'
    categories = ["Apparel", "Accessories", "Home Decor", "Health & Beauty", "Electronics", "General Merchandise"]
    req = request.defaults
      json: true
      uri: browser.apiUrl + '/v0/products'
      body:
        supplier_id: parseInt(Math.random()*1000)
        supply_price: supply_price
        baseline_price: parseInt(supply_price * (100 + ee_margin)/100)
        suggested_price: parseInt(supply_price * (100 + 30)/100)
        title: 'Product ' + i
        content: 'Content for Product ' + i
        content_meta: {}
        image_meta:
          main_image:
            url: 'http://placehold.it/' + img_size + '.png/09f/fff'
          cloudinary:
            main_image:
              url: 'http://placehold.it/' + img_size + '.png/09f/fff'            
        availability_meta: {}
        category: _.sample categories
      headers: authorization: scope.admin_token
    new Promise (resolve, reject) ->
      req.post {}, (err, res, body) ->
        if !!err then reject err else resolve body

  utils.create_selections = (product_ids, token) ->
      createOps = []
      createOps.push(utils.create_selection(product_id, token)) for product_id in product_ids
      Promise.all(createOps)

  utils.create_selection = (product_id, token) ->
    req = request.defaults
      json: true
      uri: browser.apiUrl + '/v0/selections'
      body:
        supplier_id: parseInt(Math.random()*1000)
        product_id: product_id
        margin: 15
        storefront_meta: {}
        catalog_meta: {}
        orders_meta: {}
      headers: authorization: token
    new Promise (resolve, reject) ->
      req.post {}, (err, res, body) ->
        if !!err then reject err else resolve body

  utils.log_in = (token) ->
    browser.get '/'
    token = token.replace 'Bearer ', 'Bearer%20'
    browser.manage().addCookie('loginToken', token)

  utils.log_out = () ->
    browser.manage().deleteAllCookies()

module.exports = utils