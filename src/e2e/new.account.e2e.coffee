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

describe 'eeosk new.account', () ->

  before (done) -> utils.reset_and_login browser

  describe 'account page', () ->

    it 'should have the appropriate messaging', () ->
      # browser.get '/account'
      element(has.cssContainingText '#ee-header .btn', 'More').click()
      element(has.cssContainingText '#ee-header .dropdown-menu a', 'Publish').click()
      browser.getTitle().should.eventually.contain 'Account'
