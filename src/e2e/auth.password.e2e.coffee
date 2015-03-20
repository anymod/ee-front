process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised

entry = {}
elem  = {}
scope = {}

describe 'eeosk auth.password', () ->

  before (done) ->
    elem =
      alert:  element byAttr.css '.alert'
      email:  element byAttr.model 'email'
      submit: element byAttr.css 'button[type="submit"]'
    utils.delete_all_tables()
    .then () -> utils.create_user(utils.random_user)
    .then (body) -> scope.username = body.user.username
    # .then (user) -> scope.user = user

  it 'should give alert User not found if user is not found', () ->
    browser.get '/password-reset'
    elem.alert      .isDisplayed().should.eventually.equal false
    elem.email      .sendKeys 'nonexistent@example.com'
    elem.submit     .click()
    elem.alert      .isDisplayed().should.eventually.equal true
    elem.alert      .getText().should.eventually.equal 'User not found'
    elem.email      .clear().sendKeys utils.random_user.email
    elem.submit     .click()
    elem.alert      .isDisplayed().should.eventually.equal true
    elem.alert.getText()
    .then (text) ->
      text.should.equal 'Please check your email for a link to reset your password.'
      utils.user_by_username scope.username
    .then (user) ->
      console.log 'user', user[0]
      expect(user[0].restricted_meta.password_reset_token).to.exist
