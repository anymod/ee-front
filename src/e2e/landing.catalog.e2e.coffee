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
      form:                   element byAttr.css 'form.form-horizontal'
      tryBtn:                 element byAttr.cssContainingText '.btn', 'Try it out'
      saveBtn:                element byAttr.cssContainingText '.btn', 'Save'
      saveCancelBtn:          element byAttr.cssContainingText '.btn', 'cancel'
      addProductsBtn:         element byAttr.cssContainingText '.btn', 'Add Products'
      # navbarBrand:            bottom.element byAttr.css  '.navbar .navbar-header .navbar-brand'
      # navbar:                 bottom.element byAttr.css  '.navbar.navbar-rgba-colors'
      # topBarBackgroundColor:  bottom.element byAttr.name 'storefront_meta.home.topBarBackgroundColor'
      # topBarColor:            bottom.element byAttr.name 'storefront_meta.home.topBarColor'
      # mainImageToggle:        bottom.element byAttr.name 'mainImageToggle'
      # mainImageFive:          bottom.element byAttr.repeater('imgUrl in landing.data.defaultImages').row(4)
      # carouselImage:          bottom.element byAttr.css  '#ee-bottom-view .carousel > img'
      # name:                   bottom.element byAttr.model 'landing.storefront.storefront_meta.home.name'
      modal:                  element byAttr.css '.modal'
      modalMainImage:         element byAttr.name 'mainImage'
      modalImageTwo:          element byAttr.repeater('img in modal.product.image_meta.additional_images').row(0)
      closeModalBtn:          element byAttr.cssContainingText '.modal .btn', 'Close'
      addToStoreBtn:          element byAttr.cssContainingText '.modal .btn', 'Add to store'
      setPriceBtn:            element byAttr.cssContainingText '.modal .btn', 'Set a different price'
      leftBtn:                element byAttr.name 'left-btn'
      rightBtn:               element byAttr.name 'right-btn'
      categoriesBtn:          element byAttr.cssContainingText '.btn', 'Categories'
      accessoriesBtn:         element byAttr.cssContainingText 'a', 'Accessories'
      pricesBtn:              element byAttr.cssContainingText '.btn', 'Prices'
      prices50to100Btn:       element byAttr.cssContainingText 'a', '$50 to $100'
      searchInput:            element byAttr.model 'catalog.data.inputs.search'
      searchBtn:              element byAttr.name 'search-btn'
      products:               element.all byAttr.repeater 'product in catalog.data.products'
      productSix:             element byAttr.repeater('product in catalog.data.products').row(5)

      storefrontProducts:     element.all byAttr.repeater 'product in landing.storefront.product_selection'

    utils.reset_and_login(browser)
    .then (res) ->
      scope = res
      scope.categories = ['All'].concat _.unique(_.pluck scope.products, 'category')
    .then () -> utils.create_products([21..150])

  it 'should visit the landing catalog', () ->
    browser                   .get '/logout'
    browser                   .get '/catalog'
    browser                   .getTitle().should.eventually.equal 'Add products | eeosk'

  xit 'should have 24 selectable products per page', () ->
    elem.rightBtn             .click()
    elem.rightBtn             .click()
    elem.rightBtn             .click()
    elem.products
    .then (product_array) ->
      product_array           .length.should.equal 24
      elem.productSix         .getText().should.not.eventually.contain 'in my store'

  xit 'should show product in modal when clicked', () ->
    elem.productSix           .click()
    elem.modal                .getText()
    .then (text) ->
      text                    .should.contain 'Product'
      text                    .should.contain 'Recommended price'
      text                    .should.contain 'Set a different price'
      text                    .should.contain 'Content for Product'
      text                    .should.contain 'Shipping Cost'

  xit 'should display additional images when they are clicked', () ->
    elem.modalMainImage       .getAttribute('src')
    .then (src) ->
      scope.modalMainImageSrc = src
      src                     .should.contain 'mock_cloudinary'
      elem.modalImageTwo      .click()
      elem.modalMainImage     .getAttribute('src')
    .then (src) ->
      src                     .should.not.equal scope.modalMainImageSrc
      src                     .should.contain 'mock_cloudinary'
      elem.closeModalBtn      .click()

  xit 'should filter by category', () ->
    elem.categoriesBtn        .click()
    elem.accessoriesBtn       .click()
    elem.productSix           .click()
    elem.modal                .getText().should.eventually.contain 'Product is in the category Accessories'
    elem.closeModalBtn        .click()
    element(byAttr.repeater('product in catalog.data.products').row(2)).click()
    elem.modal                .getText().should.eventually.contain 'Product is in the category Accessories'
    elem.closeModalBtn        .click()

  xit 'should filter by price', () ->
    elem.pricesBtn            .click()
    elem.prices50to100Btn     .click()
    elem.productSix           .click()
    elem.modal                .getText()
    .then (text) ->
      price     = parseFloat(text.split(/\$/)[1].split('\n')[0])
      earnings  = parseFloat(text.split(/\$/)[2].split(' ')[0])
      expect(price - earnings).to.be.within(50, 100)
      elem.closeModalBtn      .click()
      element(byAttr.repeater('product in catalog.data.products').row(2)).click()
      elem.modal              .getText()
    .then (text) ->
      price     = parseFloat(text.split(/\$/)[1].split('\n')[0])
      earnings  = parseFloat(text.split(/\$/)[2].split(' ')[0])
      expect(price - earnings).to.be.within(50, 100)
      elem.closeModalBtn      .click()

  xit 'should update with search', () ->
    browser                   .get '/catalog'
    elem.searchInput          .clear().sendKeys 'Searching USA'
    elem.searchBtn            .click()
    elem.products
    .then (product_array) ->
      product_array           .length.should.equal 0
      elem.searchInput        .clear().sendKeys 'Metal'
      elem.searchBtn          .click()
      elem.products
    .then (product_array) ->
      product_array           .length.should.equal 24
      elem.productSix         .click()
      elem.modal              .getText().should.eventually.contain 'Metal product'
      elem.closeModalBtn      .click()
      element(byAttr.repeater('product in catalog.data.products').row(8)).click()
      elem.modal              .getText().should.eventually.contain 'Metal product'
      elem.closeModalBtn      .click()

  it 'should add to store when Add to Store button is clicked', () ->
    elem.body                 .getText().should.eventually.contain 'Add products below'
    elem.productSix           .click()
    elem.addToStoreBtn        .click()
    elem.modal                .getText().should.not.eventually.contain 'Add'
    elem.modal                .getText().should.eventually.contain 'Remove from store'
    elem.closeModalBtn        .click()
    elem.body                 .getText().should.not.eventually.contain 'Add products below'
    elem.storefrontProducts
    .then (product_array) ->
      product_array           .length.should.equal 1
      browser.sleep 5000

  xit 'should show and close signup modal through save button', () ->
    elem.saveBtn              .click()
    elem.modal                .getText().should.eventually.contain 'Save & continue'
    elem.body                 .getText().should.eventually.contain 'Save & continue'
    elem.saveCancelBtn        .click()
    elem.body                 .getText().should.not.eventually.contain 'Save & continue'

  xit 'should retain landing page when navigating backward', () ->
