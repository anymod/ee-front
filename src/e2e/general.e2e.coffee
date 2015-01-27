# spec.coffee
chai            = require 'chai'
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised

describe 'eeosk general', () ->

  it 'should redirect to home when path not found', () ->
    browser.get '/foobar'
    browser.getTitle().should.eventually.have.string 'Online store builder'
    browser.getCurrentUrl().should.eventually.equal browser.baseUrl + '/'
