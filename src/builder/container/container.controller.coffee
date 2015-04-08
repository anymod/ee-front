'use strict'

angular.module('builder.container').controller 'containerCtrl', ($scope, $rootScope) ->
  $rootScope.toggleLeft = false
  user =
    storefront_meta:
      home:
        name: 'My Store'
        topBarBackgroundColor: '#dad6ff'
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
  $scope.user = user

  $scope.reset = (shw) ->
    shw.landing =
      content:                true

    shw.example =
      content:                false

    shw.store   =
      content:                false
      navbar:                 false
      mainImage:              false
      carouselContent:        false

    shw.editor  =
      navbar:                 false
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false

    shw.catalog =
      content:                false

    shw.popover =
      topBarShown:            false
      topBarColor:            false
      topBarBackgroundColor:  false
      mainImage:              false
      storeTitle:             false

    shw

  $scope.show = $scope.reset({})

  ## Landing
  showLanding = (shw) -> shw.landing  = { content: true }
  hideLanding = (shw) -> shw.landing  = { content: false }

  ## Example
  showExample = (shw) -> shw.example  = { content: true }
  hideExample = (shw) -> shw.example  = { content: false }

  ## Store
  showStore   = (shw) ->
    shw.store.content   = true
    shw.store.navbar    = true
    shw.store.mainImage = false

  ## Editor
  showEditor  = (shw) ->
    shw.editor.content                = true
    shw.editor.topBarBackgroundColor  = true
    shw.popover.topBarBackgroundColor = true
    shw.popover.topBarShown           = false

  $scope.$on 'colorpicker-closed', (e, data) ->
    if !$scope.show.popover?.topBarShown and data.name is 'user.storefront_meta.home.topBarBackgroundColor'
      $scope.show.popover.topBarShown = true
      $scope.show.popover.topBarColor = true
      $scope.show.popover.topBarBackgroundColor = false
      $scope.$apply()
    if data.name is 'user.storefront_meta.home.topBarColor'
      $scope.show.popover.topBarColor = false
      $scope.show.editor.mainImage    = true
      $scope.$apply()

  ## Catalog

  ## Functions
  $scope.tryItOut = (shw) ->
    hideLanding shw
    hideExample shw
    showStore   shw
    showEditor  shw
  $scope.$on 'initiate:tryItOut', (e, data) ->
    console.log 'data', data
    $scope.tryItOut data

  $scope.showDemoStore = (shw) ->
    shw.example.content = !shw.example.content

  $scope.setImg = (shw, img) ->
    shw.store.mainImage = true
    user.storefront_meta.home.carousel[0].imgUrl = img

  # Fisher–Yates shuffle algorithm
  shuffleArray = (array) ->
    m = array.length
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

  $scope.defaultImages = shuffleArray images

  return
