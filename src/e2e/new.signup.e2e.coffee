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

describe 'eeosk new.signup', () ->

  before () -> utils.reset browser

  describe 'dedicated signup page', () ->

    it 'should have the appropriate messaging', () ->
      browser.get '/create-online-store'
      browser.getTitle().should.eventually.contain 'Create your store'
      element(has.css '.well').getText().should.eventually.contain 'Create your store'

    it 'should navigate to the log in state', () ->
      element(has.cssContainingText '.well a', 'Log in').click()
      browser.getTitle().should.eventually.contain 'Login'
      browser.navigate().back()

    it 'should open terms & conditions modal', () ->
      browser.sleep 100
      element(has.cssContainingText '.well a', 'terms & conditions').click()
      browser.sleep 400
      element(has.css '.modal').getText().should.eventually.contain 'Seller Terms & Conditions'
      element(has.cssContainingText '.modal .btn', 'close').click()
      browser.sleep 300

    it 'should show terms modal via footer', () ->
      browser.sleep 400
      element(has.cssContainingText '#ee-footer a', 'Terms & Conditions').click()
      browser.sleep 400
      element(has.css '.modal').getText().should.eventually.contain 'Seller Terms & Conditions'
      element(has.cssContainingText '.modal .btn', 'close').click()
      browser.sleep 200

    it 'should show privacy modal via footer', () ->
      browser.sleep 400
      element(has.cssContainingText '#ee-footer a', 'Privacy Policy').click()
      browser.sleep 400
      element(has.css '.modal').getText().should.eventually.contain 'PRIVACY STATEMENT'
      element(has.cssContainingText '.modal .btn', 'close').click()
      browser.sleep 200

    it 'should show faq modal via footer', () ->
      browser.sleep 400
      element(has.cssContainingText '#ee-footer a', 'FAQ').click()
      browser.sleep 400
      element(has.css '.modal').getText().should.eventually.contain 'Frequently Asked Questions'
      element(has.cssContainingText '.modal .btn', 'close').click()
      browser.sleep 200

    it 'should notify if emails don\'t match', () ->
      element(has.css '.alert').isDisplayed().should.eventually.equal false
      element(has.model 'signup.email').sendKeys 'one-' + utils.test_user.email
      element(has.model 'signup.email_check').sendKeys 'two-' + utils.test_user.email
      element(has.model 'signup.password').sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'Emails don\'t match'

    it 'should notify if password too short', () ->
      browser.get '/create-online-store'
      element(has.model 'signup.email').sendKeys 'one-' + utils.test_user.email
      element(has.model 'signup.email_check').sendKeys 'one-' + utils.test_user.email
      element(has.model 'signup.password').sendKeys 'foobar'
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'Password must be at least 8 characters'

    it 'should not allow duplicate signups', () ->
      browser.get '/create-online-store'
      element(has.model 'signup.email').sendKeys utils.test_user.email
      element(has.model 'signup.email_check').sendKeys utils.test_user.email
      element(has.model 'signup.password').sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'email must be unique'

    it 'should be able to signup up from the signup page', () ->
      browser.get '/create-online-store'
      element(has.model 'signup.email').sendKeys 'another-' + utils.test_user.email
      element(has.model 'signup.email_check').sendKeys 'another-' + utils.test_user.email
      element(has.model 'signup.password').sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      browser.getCurrentUrl().should.eventually.equal 'http://localhost:3333/storefront'
      browser.getTitle().should.eventually.contain 'My store'

    it 'should have added loginToken cookie to browser', () ->
      browser.manage().getCookie('loginToken')
      .then (cookie) ->
        cookie.value.should.have.string('Bearer%20')

  describe 'signup modal', () ->

    it 'should open signup modal from the try/edit section', () ->
      browser.manage().deleteAllCookies()
      browser.get '/try/edit'
      element(has.cssContainingText '#ee-middle-view .btn', 'Save').click()
      browser.sleep 300
      element(has.css '.modal').getText().should.eventually.contain 'Save & continue'
      element(has.cssContainingText '.modal .btn', 'cancel').click()
      browser.sleep 300

    it 'should open signup modal from the try section header', () ->
      element(has.cssContainingText '#ee-header .btn', 'Save').click()
      browser.sleep 300
      element(has.css '.modal').getText().should.eventually.contain 'Save & continue'

    it 'should open terms & conditions modal', () ->
      element(has.cssContainingText '.modal a', 'terms & conditions').click()
      browser.sleep 400
      element(has.css '.modal-dialog:not(.modal-sm)').getText().should.eventually.contain 'Seller Terms & Conditions'
      element(has.cssContainingText '.modal-dialog:not(.modal-sm) .btn', 'close').click()
      browser.sleep 300

    it 'should notify if emails don\'t match', () ->
      element(has.css '.alert').isDisplayed().should.eventually.equal false
      element(has.model 'modal.email').sendKeys 'one-' + utils.test_user.email
      element(has.model 'modal.email_check').sendKeys 'two-' + utils.test_user.email
      element(has.model 'modal.password').sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'Emails don\'t match'

    it 'should notify if password too short', () ->
      element(has.model 'modal.email').clear().sendKeys 'one-' + utils.test_user.email
      element(has.model 'modal.email_check').clear().sendKeys 'one-' + utils.test_user.email
      element(has.model 'modal.password').clear().sendKeys 'foobar'
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'Password must be at least 8 characters'
      element(has.cssContainingText '.modal .btn', 'cancel').click()
      browser.sleep 300

    it 'should not allow duplicate signups', () ->
      element(has.cssContainingText '#ee-header .btn', 'Save').click()
      browser.sleep 300
      element(has.model 'modal.email').sendKeys utils.test_user.email
      element(has.model 'modal.email_check').sendKeys utils.test_user.email
      element(has.model 'modal.password').sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      element(has.css '.alert').isDisplayed().should.eventually.equal true
      element(has.css '.alert').getText().should.eventually.equal 'email must be unique'

    it 'should be able to signup up from the modal', () ->
      element(has.model 'modal.email').clear().sendKeys 'yet-another-' + utils.test_user.email
      element(has.model 'modal.email_check').clear().sendKeys 'yet-another-' + utils.test_user.email
      element(has.model 'modal.password').clear().sendKeys utils.test_user.password
      element(has.cssContainingText '.btn', 'Create your store').click()
      browser.getCurrentUrl().should.eventually.equal 'http://localhost:3333/storefront'
      browser.getTitle().should.eventually.contain 'My store'

    it 'should have added loginToken cookie to browser', () ->
      browser.manage().getCookie('loginToken')
      .then (cookie) ->
        cookie.value.should.have.string('Bearer%20')
