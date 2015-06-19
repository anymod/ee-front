process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised
_               = require 'lodash'

elem    = {}
scope   = {}

describe 'eeosk new.catalog', () ->

  before (done) ->
    utils.reset_and_login(browser)
    .then () -> utils.create_products([21..150])

  describe 'Logged in', () ->

    it 'should show catalog modal', () ->
      browser.sleep 300
      browser.get '/products'
      browser.getTitle().should.eventually.contain 'My store'
      element(has.cssContainingText '.navbar .btn', 'Products').click()

    it 'should show 48 products per page', () ->
      browser.sleep 300
      element.all(has.repeater 'product in catalog.data.products')
      .then (products) ->
        scope.initialProducts = products
        products.length.should.equal 48

    it 'should create a selection', () ->
      element(has.repeater('product in catalog.data.products').row(5)).click()
      browser.sleep 3000
