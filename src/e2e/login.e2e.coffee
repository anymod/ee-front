# spec.coffee
chai = require('chai')
should = chai.should()
chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

Object.defineProperty(
  protractor.promise.Promise.prototype,
  'should',
  Object.getOwnPropertyDescriptor(Object.prototype, 'should')
)

describe 'eeosk homepage', () ->
  it 'should have a title', () ->
    browser.get 'http://localhost:5000'
    element(byAttr.css('#login')).click()
    browser.getTitle().should.eventually.equal 'Login | eeosk'
    element(byAttr.name('email')).sendKeys 'tyler@eeosk.com'
    element(byAttr.name('password')).sendKeys 'foobarbaz'
    element(byAttr.name('submit')).click()
    browser.getTitle().should.eventually.equal 'Build your store | eeosk'
