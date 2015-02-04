# signup.e2e.coffee
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised

describe 'eeosk signup', () ->

  xit 'should show signup page', () ->
    browser.get '/create-online-store'
    browser.getTitle().should.eventually.equal 'Create your store | eeosk'

  it 'should notify if validations fail', () ->
    email = 'foo@bar.co'
    pass  = 'foobar'
    store = 'foob'
    browser.get '/create-online-store'
    alert = byAttr.css('.alert')
    element(alert).isDisplayed().should.eventually.equal false
    # Test for matching emails
    element(byAttr.name('email')).sendKeys email
    element(byAttr.name('email_check')).sendKeys email + 'z'
    element(byAttr.name('password')).sendKeys pass
    element(byAttr.name('username')).sendKeys store
    element(byAttr.name('submit')).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Emails don\'t match'
    # Test for short password
    element(byAttr.name('email_check')).clear().sendKeys email
    element(byAttr.name('submit')).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Password is too short'
    # Test for short store name
    element(byAttr.name('password')).sendKeys 'baz'
    element(byAttr.name('submit')).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Store name must be between 5 and 25 characters'
    # Test for valid store name
    element(byAttr.name('username')).sendKeys('\'s store 123').getAttribute('value').should.eventually.equal store + 'sstore'
    element(byAttr.name('submit')).click()
    # Test for redirect to welcome screen
    browser.getTitle().should.eventually.equal 'Build your store | eeosk'
