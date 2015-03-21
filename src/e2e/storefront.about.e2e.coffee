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
scope   = {}

describe 'eeosk storefront.about', () ->

  before (done) ->
    offscreen = element byAttr.css 'ee-offscreen-storefront-about'
    onscreen  = element byAttr.css '.onscreen'
    navbar    = element byAttr.css 'nav.navbar-rgba-colors'

    elem =
      save:                   element byAttr.name 'save'
      headlineInput:          offscreen.element byAttr.model 'user.storefront_meta.about.headline'
      contentInput:           offscreen.element byAttr.model 'user.storefront_meta.about.content'

      aboutBtn:               navbar.element byAttr.css 'ul.nav.navbar-nav:nth-child(1) > li:nth-child(4)'
      popover:                navbar.element byAttr.css 'ul.nav.navbar-nav:nth-child(1) > li:nth-child(4) .popover'
      popContent:             navbar.element byAttr.css 'ul.nav.navbar-nav:nth-child(1) > li:nth-child(4) .popover > .popover-content'

      headline:               onscreen.element byAttr.binding 'user.storefront_meta.about.headline'
      content:                onscreen.element byAttr.binding 'user.storefront_meta.about.content'

    newVal =
      headline:               'We are the absolute...\ncoolest'
      content:                'The best store with the best prices.\n\nThat is how we roll.'

    utils.reset_and_login(browser)
    .then (res) ->
      scope = res
      scope.categories = ['All'].concat _.unique(_.pluck scope.products, 'category')

  it 'should hide the about button when not in use', () ->
    browser.get '/storefront/home'
    elem.aboutBtn                                .getAttribute('class').should.eventually.equal 'ng-hide'

  describe 'visit the about section and', () ->

    before () ->
      browser.get '/storefront/about'
      browser.getTitle()                        .should.eventually.equal 'Build your store | eeosk'

    it 'show the initial button and popover', () ->
      elem.aboutBtn                             .getAttribute('class').should.eventually.equal 'active'
      elem.popContent.getText()                 .should.eventually.contain 'Add something about your store'

    it 'add headline and content', () ->
      elem.contentInput                         .sendKeys newVal.content
      elem.headlineInput                        .sendKeys newVal.headline
      elem.content                              .getText().should.eventually.equal newVal.content
      elem.headline                             .getText().should.eventually.equal newVal.headline

    it 'save headline and content', () ->
      elem.save.click()
      browser.refresh()
      elem.headline                             .getText().should.eventually.equal newVal.headline
      elem.content                              .getText().should.eventually.equal newVal.content
