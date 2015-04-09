'use strict'

angular.module('app.core').factory 'eeLanding', ($rootScope, $location, $anchorScroll, $timeout) ->

  user =
    storefront_meta:
      home:
        name: ''
        topBarBackgroundColor: '#dbd6ff'
        topBarColor: '#021709'
        carousel: [{
          imgUrl: ''
        }]
      blog: { url: 'https://eeosk.com' }
      about: { headline: 'eeosk' }
      audience:
        social:
          facebook: 'facebook'
          pinterest: 'pinterest'
          twitter: 'twitter'
          instagram: 'instagram'

  showDefaults = (shw) ->
    shw.landing   =
      content:                true
    shw.example   =
      content:                false
    shw.store     =
      content:                false
      navbar:                 false
      mainImage:              false
      carouselContent:        false
    shw.editor    =
      navbar:                 false
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false
    shw.catalog   =
      content:                false
    shw.popover   =
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false
    shw.finished  =
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false

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
  showStore   = () ->
    show.store.content   = true
    show.store.navbar    = true
    show.store.mainImage = false
  hideStore   = () ->
    show.store.content   = false
    show.store.navbar    = false
    show.store.mainImage = false

  ## Editor
  showEditor  = () ->
    show.editor.content                  = true
    show.editor.topBarBackgroundColor    = true
    show.editor.topBarColor              = false
    show.popover.topBarBackgroundColor   = true
    show.finished.topBarColor            = false
  hideEditor  = () ->
    show.editor.content                  = false
    show.editor.topBarBackgroundColor    = false
    show.editor.topBarColor              = false
    show.popover.topBarBackgroundColor   = false
    show.finished.topBarColor            = false

  $rootScope.$on 'colorpicker-closed', (e, data) ->
    if !show.finished?.topBarBackgroundColor and data.name is 'user.storefront_meta.home.topBarBackgroundColor'
      show.editor.topBarColor    = true
      show.popover.topBarColor   = true
      show.finished.topBarBackgroundColor = true
      show.popover.topBarBackgroundColor = false
      $rootScope.$apply()
    if !show.finished?.topBarColor and data.name is 'user.storefront_meta.home.topBarColor'
      show.finished.topBarColor  = true
      show.popover.topBarColor   = false
      show.editor.mainImage      = true
      $rootScope.$apply()

  ## Catalog

  ## Functions
  hidePopovers = () ->
    show.popover =
      topBarShown:            false
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false

  finishEditor = () ->
    hidePopovers()
    show.editor.alert = true

  # $rootScope.$watch 'user.storefront_meta.home.name', (newVal, oldVal) ->
  #   console.log 'new, old', newVal, oldVal
  #   if newVal?.length > 3 and show.popover?.title then $timeout(finishEditor, 2000)

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

  images = [
    # Book
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249778/book_.jpg',
    # Brick
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249925/brick.jpg',
    # Bridge
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250980/brdge.jpg',
    # City
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250064/city_.jpg',
    # Coffee
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250130/cffee.jpg',
    # Concert
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250164/cncrt.jpg',
    # Desert
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_south,h_400,w_1200/v1425250332/dsert.jpg',
    # Desk
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg',
    # Desk 2
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250486/desk2.jpg',
    # Drops
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250531/drops.jpg',
    # Ferns
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1427406804/ferns.jpg',
    # Fish
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250595/fish_.jpg',
    # Golden Light
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250656/gldnl.jpg',
    # Open Road
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250720/oroad.jpg',
    # Oranges
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251056/orngs.jpg',
    # Purple Flowers
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251082/prplf.jpg',
    # Raspberries
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251100/raspb.jpg',
    # Speeding Cars
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251183/spdcr.jpg',
    # Times Square
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251208/tmsqr.jpg',
    # Water and Sailboat
    'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251226/wslbt.jpg'
  ]


  landingState = () ->
    showLanding()
    hideExample()
    hideStore()
    hideEditor()

  tryState = () ->
    hideLanding()
    hideExample()
    showStore()
    showEditor()

  exampleState = () ->
    hideLanding()
    showExample()
    hideStore()
    hideEditor()

  user: user
  show: show
  fns:
    reset:        () -> reset show
    showState:    (name) ->
      if name is 'landing' then $timeout landingState, 100
      if name is 'try'     then $timeout tryState, 200
      if name is 'example' then $timeout exampleState, 200

    hidePopovers: () -> hidePopovers()
    # tryItOut:     () ->
    #   toggleLanding()
    #   hideExample()
    #   showStore()
    #   showEditor()
    # $rootScope.$on 'initiate:tryItOut', () -> tryItOut()

    toggleExample: () ->
      show.landing.content = !show.landing.content
      show.example.content = !show.example.content
      $location.hash 'top'
      $anchorScroll()
      $location.url $location.path()

    setImg: (img) ->
      show.store.mainImage = true
      show.editor.title = true
      show.popover.title = true
      user.storefront_meta.home.carousel[0].imgUrl = img

    finishEditor: () -> finishEditor()

    finishEditorTimeout: () -> $timeout(finishEditor, 2000)

  defaultImages: shuffleArray images
