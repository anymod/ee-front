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

describe 'eeosk new.reset', () ->

  before (done) ->
    scope.newPassword = 'foobarbaz99'
    utils.reset browser

  it 'should display proper messaging', () ->
    browser.get '/reset-password'
    browser.getTitle().should.eventually.contain 'Reset your password'
    element(has.css '.well').getText().should.eventually.contain 'Reset password'

  xit 'should navigate to signup page', () ->
  xit 'should navigate to login page', () ->
  xit 'should navigate to landing page', () ->

  it 'should show terms modal', () ->
    browser.sleep 400
    element(has.cssContainingText '#ee-footer a', 'Terms & Conditions').click()
    browser.sleep 400
    element(has.css '.modal').getText().should.eventually.contain 'Seller Terms & Conditions'
    element(has.cssContainingText '.modal .btn', 'close').click()
    browser.sleep 200

  it 'should show privacy modal', () ->
    browser.sleep 400
    element(has.cssContainingText '#ee-footer a', 'Privacy Policy').click()
    browser.sleep 400
    element(has.css '.modal').getText().should.eventually.contain 'PRIVACY STATEMENT'
    element(has.cssContainingText '.modal .btn', 'close').click()
    browser.sleep 200

  it 'should show alert message if email address doesn\'t exist', () ->
    element(has.css '.alert').isDisplayed().should.eventually.equal false
    element(has.model 'reset.email').sendKeys 'nonexistent@example.com'
    element(has.name 'submitEmail').click()
    element(has.css '.alert').getText().should.eventually.equal 'User not found'
    browser.navigate().refresh()

  it 'should send reset email with a link that works once', () ->
    element(has.css '.alert').isDisplayed().should.eventually.equal false
    element(has.model 'reset.email').sendKeys utils.test_user.email
    element(has.name 'submitEmail').click()
    element(has.css '.alert').isDisplayed().should.eventually.equal true
    element(has.css '.alert').getText()
    .then (text) ->
      text.should.equal 'Please check your email for a link to reset your password.'
      utils.user_by_username utils.test_user.username
    .then (user) ->
      scope.password_reset_token = user[0].restricted_meta.password_reset_token
      expect(scope.password_reset_token).to.exist
      # generate a jwt similar to one sent in the email
      token = utils.jwt({ token: user[0].ee_uuid, password_reset_token: scope.password_reset_token })
      browser.get '/reset-password?token=' + token
      element(has.css '.alert').isDisplayed().should.eventually.equal false
      element(has.model 'reset.password').sendKeys 'foobar'
      element(has.model 'reset.password_confirmation').sendKeys 'foobar'
      element(has.name 'submitPassword').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'Password must be at least 8 characters'
      element(has.model 'reset.password').clear().sendKeys scope.newPassword
      element(has.model 'reset.password_confirmation').clear().sendKeys scope.newPassword
      element(has.name 'submitPassword').click()
      element(has.css '.alert').getText().should.eventually.equal 'Password reset successfully. Log in to continue.'

  it 'token should fail on subsequent uses', () ->
    browser.navigate().refresh()
    element(has.model 'reset.password').clear().sendKeys 'another' + scope.newPassword
    element(has.model 'reset.password_confirmation').clear().sendKeys 'another' + scope.newPassword
    element(has.name 'submitPassword').click()
    element(has.css '.alert').getText().should.eventually.equal 'Invalid password reset token'

  it 'should be able to log in with new password', () ->
    browser.get 'login'
    element(has.model 'login.email').sendKeys utils.test_user.email
    element(has.model 'login.password').sendKeys scope.newPassword
    element(has.cssContainingText '.btn', 'Sign in').click()
    browser.getTitle().should.eventually.contain 'My store'
