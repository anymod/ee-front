'use strict'

angular.module('builder.container').controller 'containerCtrl', ($scope, $rootScope, user, eeStorefront) ->
  $rootScope.toggleLeft = false
  $scope.user = user

  ## Define storefront & categories
  eeStorefront.getStorefront(true)
  .then (storefront) ->
    $scope.storefront = storefront
    eeStorefront.setScopeCategories(storefront, $scope)

  $scope.show = {}
  $scope.show.colorPopover      = false
  $scope.show.headlinePopover   = false
  $scope.show.blogPopover       = true

  $scope.setImg = (img) -> user.storefront_meta.home.carousel[0].imgUrl = img

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
