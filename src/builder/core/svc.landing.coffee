'use strict'

angular.module('app.core').factory 'eeLanding', ($rootScope, $location, $anchorScroll, $timeout) ->

  landing = {}

  user =
    storefront_meta:
      home:
        name: ''
        topBarBackgroundColor: '#dbd6ff'
        topBarColor: '#021709'
        carousel: [{ imgUrl: '' }]
      blog: { url: 'https://eeosk.com' }
      about: { headline: 'eeosk' }
      audience:
        social:
          facebook:   'facebook'
          pinterest:  'pinterest'
          twitter:    'twitter'
          instagram:  'instagram'

  product_selection = []

  images = [
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
  shuffleArray = (array) ->
    if !array then return
    m = array?.length
    t = i = null
    while (m)
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    array

  showDefaults = (shw) ->
    shw.landing   =
      content:                true
    shw.example   =
      content:                false
    shw.store     =
      content:                false
      mainImage:              false
      carouselContent:        false
      products:               false
      footer:                 false
    shw.editor    =
      topBarColor:            true
      topBarBackgroundColor:  true
      mainImage:              false
      title:                  false
    shw.catalog   =
      content:                false
    shw.popover   =
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      title:                  false
    shw.finished  =
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      title:                  false

  show = {}
  reset = (shw) -> showDefaults shw
  reset show

  ## Landing
  showLanding = () -> show.landing.content = true
  hideLanding = () -> show.landing.content = false

  ## Example
  showExample = () -> show.example.content = true
  hideExample = () -> show.example.content = false

  ## Store
  showStore   = () -> show.store.content   = true
  hideStore   = () -> show.store.content   = false

  ## Editor
  showEditor  = () ->
    show.editor.content                  = true
    if !show.finished?.topBarBackgroundColor
      showPopover 'topBarBackgroundColor'
      show.editor.topBarColor            = false
  hideEditor = () -> show.editor.content = false

  ## Catalog
  showCatalog   = () -> show.catalog.content = true
  hideCatalog   = () -> show.catalog.content = false

  ## Popover
  showPopover = (name) -> show.popover[name] = true
  hidePopover = (name) -> show.popover[name] = false
  hidePopovers = (ary) -> hidePopover name for name in ary

  $rootScope.$on 'colorpicker-closed', (e, data) ->
    show.editor.topBarColor = true
    if !show.finished?.topBarBackgroundColor and data.name is 'landing.user.storefront_meta.home.topBarBackgroundColor'
      show.finished.topBarBackgroundColor = true
      showPopover 'topBarColor'
      $rootScope.$apply()
    if !show.finished?.topBarColor and data.name is 'landing.user.storefront_meta.home.topBarColor'
      show.finished.topBarColor  = true
      show.editor.mainImage      = true
      hidePopover 'topBarColor'
      $rootScope.$apply()

  ## Functions
  scrollTop = () ->
    $location.hash 'body-top'
    $anchorScroll()
    $location.url $location.path()

  finishEditor = () ->
    hidePopovers ['topBarColor', 'topBarBackgroundColor', 'mainImage', 'title']
    show.editor.alert = true

  startCatalog = () ->
    console.log show
    hideLanding()
    $rootScope.pin.bottom = false
    user.storefront_meta.home.carousel[0].imgUrl ||= shuffleArray(images)[0]
    show.store.mainImage = false
    showStoreProducts = () ->
      show.store.products = true
      showCatalog()
    $timeout showStoreProducts, 200
    hideExample()
    hideEditor()
    showStore()
    scrollTop()

  landingState = () ->
    showLanding()
    hideExample()
    hideStore()
    hideEditor()
    scrollTop()

  tryState = () ->
    hideLanding()
    hideExample()
    showStore()
    show.store.mainImage = !!user?.storefront_meta?.home?.carousel[0]?.imgUrl
    showEditor()
    scrollTop()

  exampleState = () ->
    hideLanding()
    showExample()
    hideStore()
    hideEditor()
    scrollTop()

  ## Exposed variables and functions
  user: user
  show: show
  product_selection: product_selection

  defaultImages: shuffleArray images

  fns:
    reset:        () -> reset show
    showState:    (name) ->
      if name is 'landing' then $timeout landingState, 100
      if name is 'try'
        if show.store.products
          show.store.mainImage = true
          show.store.products  = false
        $timeout tryState, 200
      if name is 'example' then $timeout exampleState, 200

    showPopover: (name) -> showPopover name
    hidePopover: (name) -> hidePopover name

    setImg: (img) ->
      show.store.mainImage = true
      show.editor.title    = true
      if !show.finished?.title
        showPopover 'title'
        show.finished.title = true
      user.storefront_meta.home.carousel[0].imgUrl = img

    finishEditor: () -> finishEditor()
    finishEditorTimeout: () -> $timeout(finishEditor, 2000)

    startCatalog: () -> startCatalog()

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
