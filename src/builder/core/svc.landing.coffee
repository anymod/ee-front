'use strict'

angular.module('app.core').factory 'eeLanding', ($rootScope, $location, $anchorScroll, $timeout) ->

  ## SETUP
  _showDefaults =
    landing:
      content:                true
    example:
      content:                false
    store:
      content:                false
      mainImage:              false
      carouselContent:        false
      products:               false
      footer:                 false
    editor:
      topBarColor:            true
      topBarBackgroundColor:  true
      mainImage:              false
      title:                  false
    catalog:
      content:                false
    popover:
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      title:                  false
    finished:
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      title:                  false

  _images = [
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249778/book_.jpg', # Book
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249925/brick.jpg', # Brick
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250980/brdge.jpg', # Bridge
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250064/city_.jpg', # City
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250130/cffee.jpg', # Coffee
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250164/cncrt.jpg', # Concert
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_south,h_400,w_1200/v1425250332/dsert.jpg', # Desert
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg', # Desk
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250486/desk2.jpg', # Desk 2
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250531/drops.jpg', # Drops
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1427406804/ferns.jpg', # Ferns
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250595/fish_.jpg', # Fish
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250656/gldnl.jpg', # Golden Light
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250720/oroad.jpg', # Open Road
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251056/orngs.jpg', # Oranges
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251082/prplf.jpg', # Purple Flowers
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251100/raspb.jpg', # Raspberries
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251183/spdcr.jpg', # Speeding Cars
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251208/tmsqr.jpg', # Times Square
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251226/wslbt.jpg' # Water and Sailboat
  ]

  # Fisher–Yates shuffle algorithm
  _shuffleArray = (array) ->
    if !array then return
    m = array?.length
    t = i = null
    while (m)
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    array

  ## PRIVATE EXPORT DEFAULTS
  _show = _showDefaults
  _data =
    defaultImages: _shuffleArray _images

  ## PRIVATE FUNCTIONS
  _reset = () -> _show = _showDefaults

  ## Landing
  _showLanding = () -> _show.landing.content = true
  _hideLanding = () -> _show.landing.content = false

  ## Example
  _showExample = () -> _show.example.content = true
  _hideExample = () -> _show.example.content = false

  ## Store
  _showStore   = () -> _show.store.content   = true
  _hideStore   = () -> _show.store.content   = false

  ## Editor
  _showEditor  = () ->
    _show.editor.content                  = true
    if !_show.finished?.topBarBackgroundColor
      _showPopover 'topBarBackgroundColor'
      _show.editor.topBarColor            = false
  _hideEditor = () -> _show.editor.content = false

  ## Catalog
  _showCatalog   = () -> _show.catalog.content = true
  _hideCatalog   = () -> _show.catalog.content = false

  ## Popover
  _showPopover = (name) -> _show.popover[name] = true
  _hidePopover = (name) -> _show.popover[name] = false
  _hidePopovers = (ary) -> _hidePopover name for name in ary

  $rootScope.$on 'colorpicker-closed', (e, data) ->
    _show.editor.topBarColor = true
    if !_show.finished?.topBarBackgroundColor and data.name is 'landing.storefront.storefront_meta.home.topBarBackgroundColor'
      _show.finished.topBarBackgroundColor = true
      _showPopover 'topBarColor'
      $rootScope.$apply()
    if !_show.finished?.topBarColor and data.name is 'landing.storefront.storefront_meta.home.topBarColor'
      _show.finished.topBarColor  = true
      _show.editor.mainImage      = true
      _hidePopover 'topBarColor'
      $rootScope.$apply()

  ## Other
  _scrollTop = () ->
    $location.hash 'body-top'
    $anchorScroll()
    $location.url $location.path()

  _finishEditor = () ->
    _hidePopovers ['topBarColor', 'topBarBackgroundColor', 'mainImage', 'title']
    _show.editor.alert = true

  _startCatalog = () ->
    _hideLanding()
    $rootScope.pin.bottom = false
    _show.store.mainImage = false
    showStoreProducts = () ->
      _show.store.products = true
      _showCatalog()
    $timeout showStoreProducts, 200
    _hideExample()
    _hideEditor()
    _showStore()
    _scrollTop()

  _landingState = () ->
    _showLanding()
    _hideExample()
    _hideStore()
    _hideEditor()
    _scrollTop()

  _tryState = () ->
    _hideLanding()
    _hideExample()
    _showStore()
    _showEditor()
    _scrollTop()

  _exampleState = () ->
    _hideLanding()
    _showExample()
    _hideStore()
    _hideEditor()
    _scrollTop()

  ## EXPORTS
  show: _show
  data: _data
  fns:
    reset:        () -> _reset()
    showState:    (name) ->
      if name is 'landing' then $timeout _landingState, 100
      if name is 'try'
        if _show.store.products
          _show.store.mainImage = true
          _show.store.products  = false
        $timeout _tryState, 200
      if name is 'example' then $timeout _exampleState, 200

    showPopover: (name) -> _showPopover name
    hidePopover: (name) -> _hidePopover name

    showCarouselImage: (img) ->
      _show.store.mainImage = true
      _show.editor.title    = true
      if !_show.finished?.title
        _showPopover 'title'
        _show.finished.title = true

    finishEditor: () -> _finishEditor()
    finishEditorTimeout: () -> $timeout _finishEditor, 2000

    startCatalog: () -> _startCatalog()

    selectProduct: (product, margin) ->
      product_selection.push {
        product_id:         product.id
        selling_price:      parseInt(product.baseline_price * (100 + margin)/100)
        shipping_price:     product.availability_meta.ship_cost
        title:              product.title
        content:            product.content
        content_meta:       product.content_meta
        image_meta:         product.image_meta
        availability_meta:  product.availability_meta
        category:           product.category
      }
