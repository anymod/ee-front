process.env.NODE_ENV = 'test'
utils           = require './utils.e2e.db'
chai            = require 'chai'
expect          = require('chai').expect
should          = chai.should()
chaiAsPromised  = require 'chai-as-promised'
chai.use chaiAsPromised
_               = require 'lodash'

elem    = {}
oldVal  = {}
newVal  = {}
scope   = {}

describe 'eeosk landing.catalog', () ->

  before (done) ->
    bottom = element byAttr.css '#ee-bottom-view'

    elem =
      body:                   element byAttr.css 'body'
      form:                   bottom.element byAttr.css 'form.form-horizontal'
      tryBtn:                 bottom.element byAttr.cssContainingText '.btn', 'Try it out'
      saveBtn:                bottom.element byAttr.cssContainingText '.btn', 'Save'
      saveCancelBtn:          element byAttr.cssContainingText '.btn', 'cancel'
      addProductsBtn:         bottom.element byAttr.cssContainingText '.btn', 'Add Products'
      navbarBrand:            bottom.element byAttr.css  '.navbar .navbar-header .navbar-brand'
      navbar:                 bottom.element byAttr.css  '.navbar.navbar-rgba-colors'
      topBarBackgroundColor:  bottom.element byAttr.name 'storefront_meta.home.topBarBackgroundColor'
      topBarColor:            bottom.element byAttr.name 'storefront_meta.home.topBarColor'
      mainImageToggle:        bottom.element byAttr.name 'mainImageToggle'
      mainImageFive:          bottom.element byAttr.repeater('imgUrl in landing.data.defaultImages').row(4)
      carouselImage:          bottom.element byAttr.css  '#ee-bottom-view .carousel > img'
      name:                   bottom.element byAttr.model 'landing.storefront.storefront_meta.home.name'
      modalTitle:             element byAttr.css '.modal'

    utils.reset_and_login(browser)
    .then (res) ->
      scope = res
      scope.categories = ['All'].concat _.unique(_.pluck scope.products, 'category')
    .then () -> utils.create_products([21..150])

  it 'should visit the landing catalog', () ->
    browser                   .get '/logout'
    browser                   .get '/catalog'
    browser                   .getTitle().should.eventually.equal 'Add products | eeosk'
    browser.sleep 5000
