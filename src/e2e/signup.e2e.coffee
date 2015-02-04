process.env.NODE_ENV = 'test'
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
    random_str  = 'nkbwf' # Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,5)
    email_entry = random_str + '@foo.bar'
    pass_entry  = 'foobar'
    store_entry = random_str
    browser.get '/create-online-store'
    alert       = byAttr.css('.alert')
    email       = byAttr.name('email')
    email_check = byAttr.name('email_check')
    password    = byAttr.name('password')
    username    = byAttr.name('username')
    submit      = byAttr.name('submit')
    element(alert).isDisplayed().should.eventually.equal false
    # Test for matching emails
    element(email).sendKeys email_entry
    element(email_check).sendKeys email_entry + 'z'
    element(password).sendKeys pass_entry
    element(username).sendKeys store_entry
    element(submit).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Emails don\'t match'
    # Test for short password
    element(email_check).clear().sendKeys email_entry
    element(submit).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Password is too short'
    # Test for short store name
    element(password).sendKeys 'baz'
    element(submit).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Store name must be between 5 and 25 characters'
    # Test for valid store name
    element(username).sendKeys('\'s store 123').getAttribute('value').should.eventually.equal store_entry + 'sstore'
    # Test for duplicate user
    element(submit).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'Password is too short'

    # Test for redirect to welcome screen
    browser.getTitle().should.eventually.equal 'Build your store | eeosk'
