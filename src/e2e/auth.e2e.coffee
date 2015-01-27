# spec.coffee
chai            = require 'chai'
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised

describe 'eeosk auth', () ->

  it 'should show message on invalid login', () ->
    browser.manage().deleteAllCookies()
    browser.get '/login'
    alert = byAttr.css('.alert')
    element(alert).isDisplayed().should.eventually.equal false
    element(byAttr.name('email')).sendKeys 'tyler@eeosk.com'
    element(byAttr.name('password')).sendKeys 'foobar'
    element(byAttr.name('submit')).click()
    element(alert).isDisplayed().should.eventually.equal true
    element(alert).getText().should.eventually.equal 'invalid email or password'

  it 'should allow login', () ->
    browser.manage().deleteAllCookies()
    browser.get '/login'
    browser.getTitle().should.eventually.equal 'Login | eeosk'
    element(byAttr.name('email')).sendKeys 'tyler@eeosk.com'
    element(byAttr.name('password')).sendKeys 'foobarbaz'
    element(byAttr.name('submit')).click()
    browser.getTitle().should.eventually.equal 'Build your store | eeosk'
    browser.manage().getCookie('loginToken')
    .then (cookie) -> cookie.value.should.have.string('Bearer%20')

  it 'should allow logout', () ->
    browser.manage().addCookie('loginToken','Bearer%20foo.bar.baz')
    browser.get '/account'
    browser.getTitle().should.eventually.equal 'Account | eeosk'
    browser.get '/logout'
    browser.getTitle().should.eventually.have.string 'Online store builder'
    browser.manage().getCookie('loginToken')
    .then (cookie) -> should.not.exist(cookie)

  it 'should not allow app visits when logged out', () ->
    browser.manage().deleteAllCookies()
    browser.get '/storefront/home'
    browser.getTitle().should.eventually.equal 'Login | eeosk'
    browser.get '/catalog'
    browser.getTitle().should.eventually.equal 'Login | eeosk'
    browser.get '/orders'
    browser.getTitle().should.eventually.equal 'Login | eeosk'
    browser.get '/account'
    browser.getTitle().should.eventually.equal 'Login | eeosk'
