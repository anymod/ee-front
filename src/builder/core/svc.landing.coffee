'use strict'

angular.module('builder.core').factory 'eeLanding', ($rootScope, $timeout, $modal) ->

  ## SETUP
  _userDefaults =
    storefront_meta:
      home:
        name: 'Example'
        topBarBackgroundColor: '#dbd6ff'
        topBarColor: '#021709'
        # carousel: [{ imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg' }]
      blog: { url: 'https://eeosk.com' }
      about: { headline: 'eeosk' }
      audience:
        social:
          facebook:   'facebook'
          pinterest:  'pinterest'
          twitter:    'twitter'
          instagram:  'instagram'

  # _showDefaults =
  #   landing: content: true
  #   example: content: false
  #   popover:
  #     edit:     true
  #     catalog:  true

  _demoStores = [
    {
      name: 'Book'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249778/book_.jpg'
      topBarBackgroundColor: '#fafce8'
      topBarColor: '#321b01'
    },{
      name: 'Brick'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249925/brick.jpg'
      topBarBackgroundColor: '#824b4b'
      topBarColor: '#ffffff'
    },{
      name: 'Bridge'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250980/brdge.jpg'
      topBarBackgroundColor: '#e5cdb3'
      topBarColor: '#1f1e1e'
    },{
      name: 'City'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250064/city_.jpg'
      topBarBackgroundColor: '#fffae0'
      topBarColor: '#000000'
    },{
      name: 'Coffee'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250130/cffee.jpg'
      topBarBackgroundColor: '#c98a4f'
      topBarColor: '#960000'
    },{
      name: 'Concert'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250164/cncrt.jpg'
      topBarBackgroundColor: '#000000'
      topBarColor: '#dbf1ff'
    },{
      name: 'Desert'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_south,h_400,w_1200/v1425250332/dsert.jpg'
      topBarBackgroundColor: '#701600'
      topBarColor: '#ffffff'
    },{
      name: 'Desk'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg'
      topBarBackgroundColor: '#dad8d8'
      topBarColor: '#3d3d3d'
    },{
      name: 'Desk 2'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250486/desk2.jpg'
      topBarBackgroundColor: '#321706'
      topBarColor: '#ffffff'
    },{
      name: 'Drops'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250531/drops.jpg'
      topBarBackgroundColor: '#291e34'
      topBarColor: '#ffffff'
    },{
      name: 'Ferns'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425250561/ferns.jpg'
      topBarBackgroundColor: '#123a2d'
      topBarColor: '#f1eadf'
    },{
      name: 'Fish'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250595/fish_.jpg'
      topBarBackgroundColor: '#eefcfb'
      topBarColor: '#001a33'
    },{
      name: 'Golden Light'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250656/gldnl.jpg'
      topBarBackgroundColor: '#291205'
      topBarColor: '#fffdd6'
    },{
      name: 'Open Road'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250720/oroad.jpg'
      topBarBackgroundColor: '#1a1e23'
      topBarColor: '#ffffff'
    },{
      name: 'Oranges'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251056/orngs.jpg'
      topBarBackgroundColor: '#add8ff'
      topBarColor: '#b34b05'
    },{
      name: 'Purple Flowers'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251082/prplf.jpg'
      topBarBackgroundColor: '#ebb8ff'
      topBarColor: '#000000'
    },{
      name: 'Raspberries'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251100/raspb.jpg'
      topBarBackgroundColor: '#ffffff'
      topBarColor: '#000000'
    },{
      name: 'Speeding Cars'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251183/spdcr.jpg'
      topBarBackgroundColor: '#242323'
      topBarColor: '#e6d5d1'
    },{
      name: 'Times Square'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251208/tmsqr.jpg'
      topBarBackgroundColor: '#de423a'
      topBarColor: '#f2f3f1'
    },{
      name: 'Water and Sailboat'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251226/wslbt.jpg'
      topBarBackgroundColor: '#a80000'
      topBarColor: '#ffffff'
    }
  ]

  _themes = [
    {
      topBarBackgroundColor: '#414141'
      topBarColor: '#FFFFFF'
    },
    {
      topBarBackgroundColor: '#FFFFFF'
      topBarColor: '#555555'
    },
    # Dark
    {
      topBarBackgroundColor: '#630000'
      topBarColor: '#FFFFFF'
    },
    {
      topBarBackgroundColor: '#632910'
      topBarColor: '#FFC6A5'
    },
    {
      topBarBackgroundColor: '#184A18'
      topBarColor: '#FF92D6'
    },
    {
      topBarBackgroundColor: '#08215A'
      topBarColor: '#E0E0E0'
    },
    {
      topBarBackgroundColor: '#4A0042'
      topBarColor: '#FFFF9C'
    },
    # Regular
    {
      topBarBackgroundColor: '#FF6342'
      topBarColor: '#FFFFFF'
    },
    {
      topBarBackgroundColor: '#FF9C4A'
      topBarColor: '#840000'
    },
    {
      topBarBackgroundColor: '#FFFF42'
      topBarColor: '#555555'
    },
    {
      topBarBackgroundColor: '#52B552'
      topBarColor: '#FFFFFF'
    },
    {
      topBarBackgroundColor: '#63C6DE'
      topBarColor: '#FFFF9C'
    },
    {
      topBarBackgroundColor: '#9C7BBD'
      topBarColor: '#AD0000'
    },
    {
      topBarBackgroundColor: '#DE5AAD'
      topBarColor: '#FFFFFF'
    },
    # Light
    {
      topBarBackgroundColor: '#FFE7C6'
      topBarColor: '#D66321'
    },
    {
      topBarBackgroundColor: '#F7FFCE'
      topBarColor: '#3152A5'
    },
    {
      topBarBackgroundColor: '#C6E7DE'
      topBarColor: '#FF3118'
    },
    {
      topBarBackgroundColor: '#C6EFF7'
      topBarColor: '#103910'
    },
    {
      topBarBackgroundColor: '#C6B5DE'
      topBarColor: '#333333'
    },
    {
      topBarBackgroundColor: '#F7BDDE'
      topBarColor: '#08215A'
    }
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
  # _show = _showDefaults
  _data =
    demoStores: _shuffleArray _demoStores
    meta: _userDefaults.storefront_meta
    signup:
      selections: []

  ## EXPORTS
  # show:   _show
  data:   _data
  themes: _themes

  landingUser: _userDefaults

  fns:
    openExampleModal: () ->
      $modal.open({
        templateUrl: 'builder/example/example.modal.html'
        backdropClass: 'white-background opacity-08'
        size: 'sm'
      })
