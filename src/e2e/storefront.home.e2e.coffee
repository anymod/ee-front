process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised

elem    = {}
newVal  = {}

describe 'eeosk storefront home', () ->

  before (done) ->
    offscreen = element byAttr.css 'ee-offscreen-storefront-home'
    elem =
      alert:                  element byAttr.css  '.alert'
      save:                   element byAttr.name 'save'
      navbar:                 element byAttr.css  '.navbar.navbar-rgba-colors'
      navbarBrand:            element byAttr.css  '.navbar .navbar-brand'
      carouselImg:            element byAttr.css  '.carousel img'
      carouselWell:           element byAttr.css  '.carousel .position-absolute'
      carouselWellH3:         element byAttr.css  '.carousel .well h3'
      carouselWellP:          element byAttr.css  '.carousel .well p'
      carouselWellA:          element byAttr.css  '.carousel .well a'

      topBarColor:            offscreen.element byAttr.name 'storefront_meta.home.topBarColor'
      topBarBackgroundColor:  offscreen.element byAttr.name 'storefront_meta.home.topBarBackgroundColor'
      name:                   offscreen.element byAttr.model 'user.storefront_meta.home.name'
      carouselHeadline:       offscreen.element byAttr.model 'user.storefront_meta.home.carousel[0].headline'
      carouselByline:         offscreen.element byAttr.model 'user.storefront_meta.home.carousel[0].byline'
      carouselBtnText:        offscreen.element byAttr.model 'user.storefront_meta.home.carousel[0].btnText'
      carouselBtnPosition:    offscreen.element byAttr.css '.btn-group'
      carouselLinkCategory:   offscreen.element byAttr.model 'user.storefront_meta.home.carousel[0].linkCategory'

    newVal =
      topBarColor:            '#FFF'
      topBarBackgroundColor:  '#000000'
      name:                   'New Name'
      carouselHeadline:       'New Headline'
      carouselByline:         'New Byline'
      carouselBtnText:        'New Button'

    utils.delete_all_tables()
    browser.get '/login'
    browser.manage().deleteAllCookies()
    utils.create_admin()
    .then () ->
      utils.create_products(10)
    .then () ->
      utils.create_user(utils.test_user)
    .then (data) ->
      utils.log_in data.token
      browser.get '/storefront/home'
      browser.getTitle().should.eventually.equal 'Build your store | eeosk'

  describe 'changing and updating store', () ->

    it 'should reflect changes to the store name', () ->
      elem.name                   .getAttribute('value').should.eventually.equal 'Common Deer VT'
      elem.navbarBrand            .getText().should.eventually.equal 'Common Deer VT'
      elem.name                   .clear().sendKeys newVal.name
      elem.navbarBrand            .getText().should.eventually.equal newVal.name

    it 'should reflect changes to the navbar colors', () ->
      elem.navbarBrand            .getAttribute('style').should.eventually.contain 'color: rgb(246, 246, 246)'
      elem.navbar                 .getAttribute('style').should.eventually.contain 'background-color: rgb(34, 34, 34)'
      elem.topBarColor            .clear().sendKeys newVal.topBarColor
      elem.topBarBackgroundColor  .clear().sendKeys newVal.topBarBackgroundColor
      elem.navbarBrand            .getAttribute('style').should.eventually.contain 'color: rgb(0, 0, 0)'
      elem.navbar                 .getAttribute('style').should.eventually.contain 'background-color: rgb(255, 255, 255)'

    it 'should reflect changes to the carousel', () ->
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

    it 'should have saved the changes that were made', () ->
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
