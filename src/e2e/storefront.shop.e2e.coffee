process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised
_               = require 'lodash'

elem    = {}
newVal  = {}

describe 'eeosk storefront shop', () ->

  before (done) ->
    offscreen = element byAttr.css 'ee-offscreen-storefront-shop'
    elem =
      alert:                  element byAttr.css  '.alert'
      save:                   element byAttr.name 'save'

    newVal =
      topBarColor:            '#FFF'
      topBarBackgroundColor:  '#000000'
      name:                   'New Name'
      carouselHeadline:       'New Headline'
      carouselByline:         'New Byline'
      carouselBtnText:        'New Button'

    utils.reset_and_login(browser)
    .then (res) ->
      scope = res
      scope.categories = ['All'].concat _.unique(_.pluck scope.products, 'category')

  it 'should visit the shop section', () ->
    browser.get '/storefront/shop'
    browser.getTitle().should.eventually.equal 'Build your store | eeosk'

  describe 'changing and updating store', () ->

    xit 'should reflect changes to the navbar colors', () ->
      elem.navbarBrand            .getAttribute('style').should.eventually.contain 'color: rgb(246, 246, 246)'
      elem.navbar                 .getAttribute('style').should.eventually.contain 'background-color: rgb(34, 34, 34)'
      elem.topBarColor            .clear().sendKeys newVal.topBarColor
      elem.topBarBackgroundColor  .clear().sendKeys newVal.topBarBackgroundColor
      elem.navbarBrand            .getAttribute('style').should.eventually.contain 'color: rgb(0, 0, 0)'
      elem.navbar                 .getAttribute('style').should.eventually.contain 'background-color: rgb(255, 255, 255)'

    xit 'should reflect changes to the carousel', () ->
      elem.carouselHeadline       .getAttribute('value').should.eventually.equal 'TOPO DESIGNS'
      elem.carouselHeadline       .clear().sendKeys newVal.carouselHeadline
      elem.carouselHeadline       .getAttribute('value').should.eventually.equal newVal.carouselHeadline

      elem.carouselByline         .getAttribute('value').should.eventually.equal 'OUR FAVORITE PACKS'
      elem.carouselByline         .clear().sendKeys newVal.carouselByline
      elem.carouselByline         .getAttribute('value').should.eventually.equal newVal.carouselByline

      elem.carouselBtnText        .getAttribute('value').should.eventually.equal 'SHOP NOW'
      elem.carouselBtnText        .clear().sendKeys newVal.carouselBtnText
      elem.carouselBtnText        .getAttribute('value').should.eventually.equal newVal.carouselBtnText

      elem.carouselBtnPosition    .all(byAttr.css('.btn')).get(0).click()
      elem.carouselWell           .getAttribute('class').should.eventually.contain 'left'
      elem.carouselBtnPosition    .all(byAttr.css('.btn')).get(2).click()
      elem.carouselWell           .getAttribute('class').should.eventually.contain 'right'
      elem.carouselBtnPosition    .all(byAttr.css('.btn')).get(1).click()
      elem.carouselWell           .getAttribute('class').should.eventually.contain 'middle'

      elem.carouselLinkCategory   .getAttribute('value').should.eventually.equal 'Bags'
      elem.carouselLinkCategory   .element(byAttr.css('option:nth-child(1)')).click()
      elem.carouselLinkCategory   .getAttribute('value').should.eventually.equal 'Accessories'

    xit 'should have saved the changes that were made', () ->
      elem.save                   .click()
      browser.get '/storefront/home'
      elem.carouselHeadline       .getAttribute('value').should.eventually.equal newVal.carouselHeadline
      elem.carouselByline         .getAttribute('value').should.eventually.equal newVal.carouselByline
      elem.carouselBtnText        .getAttribute('value').should.eventually.equal newVal.carouselBtnText
      elem.carouselWell           .getAttribute('class').should.eventually.contain 'middle'
      elem.carouselLinkCategory   .getAttribute('value').should.eventually.equal 'Accessories'
      elem.navbarBrand            .getText().should.eventually.equal newVal.name
      elem.navbarBrand            .getAttribute('style').should.eventually.contain 'color: rgb(0, 0, 0)'
      elem.navbar                 .getAttribute('style').should.eventually.contain 'background-color: rgb(255, 255, 255)'
