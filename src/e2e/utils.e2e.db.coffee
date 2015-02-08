process.env.NODE_ENV = 'test'
sequelize = require './utils.e2e.sequelize'
Promise   = require 'bluebird'
request   = require 'request'
jwt       = require 'jsonwebtoken'
_         = require 'lodash'

utils = {}

random_string       = () -> Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5)
random_string_const = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5)

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
        if !!err then reject err else resolve body


  utils.log_in = (token, browser) ->
    token = token.replace 'Bearer ', 'Bearer%20'
    browser.manage().addCookie('loginToken', token)

  utils.log_out = (browser) ->
    browser.manage().deleteAllCookies()

module.exports = utils
