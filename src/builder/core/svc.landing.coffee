'use strict'

angular.module('builder.core').factory 'eeLanding', ($rootScope, $timeout, $modal) ->

  ## SETUP
  _userDefaults =
    storefront_meta:
      name: 'Example'
      brand:
        text:
          x: 0
          y: 6
          family: 'Amaranth'
          size: 28
        color:
          primary: '#dbd6ff'
          secondary: '#dbd6ff'
          tertiary: '#021709'
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
      primary: '#fafce8'
      secondary: '#fafce8'
      tertiary: '#321b01'
    },{
      name: 'Brick'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425249925/brick.jpg'
      primary: '#824b4b'
      secondary: '#824b4b'
      tertiary: '#ffffff'
    },{
      name: 'Bridge'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250980/brdge.jpg'
      primary: '#e5cdb3'
      secondary: '#e5cdb3'
      tertiary: '#1f1e1e'
    },{
      name: 'City'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250064/city_.jpg'
      primary: '#fffae0'
      secondary: '#fffae0'
      tertiary: '#000000'
    },{
      name: 'Coffee'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250130/cffee.jpg'
      primary: '#c98a4f'
      secondary: '#c98a4f'
      tertiary: '#960000'
    },{
      name: 'Concert'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250164/cncrt.jpg'
      primary: '#000000'
      secondary: '#000000'
      tertiary: '#dbf1ff'
    },{
      name: 'Desert'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_south,h_400,w_1200/v1425250332/dsert.jpg'
      primary: '#701600'
      secondary: '#701600'
      tertiary: '#ffffff'
    },{
      name: 'Desk'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250403/desk1.jpg'
      primary: '#dad8d8'
      secondary: '#dad8d8'
      tertiary: '#3d3d3d'
    },{
      name: 'Desk 2'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250486/desk2.jpg'
      primary: '#321706'
      secondary: '#321706'
      tertiary: '#ffffff'
    },{
      name: 'Drops'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250531/drops.jpg'
      primary: '#291e34'
      secondary: '#291e34'
      tertiary: '#ffffff'
    },{
      name: 'Ferns'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425250561/ferns.jpg'
      primary: '#123a2d'
      secondary: '#123a2d'
      tertiary: '#f1eadf'
    },{
      name: 'Fish'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250595/fish_.jpg'
      primary: '#eefcfb'
      secondary: '#eefcfb'
      tertiary: '#001a33'
    },{
      name: 'Golden Light'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_center,h_400,w_1200/v1425250656/gldnl.jpg'
      primary: '#291205'
      secondary: '#291205'
      tertiary: '#fffdd6'
    },{
      name: 'Open Road'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250720/oroad.jpg'
      primary: '#1a1e23'
      secondary: '#1a1e23'
      tertiary: '#ffffff'
    },{
      name: 'Oranges'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251056/orngs.jpg'
      primary: '#add8ff'
      secondary: '#add8ff'
      tertiary: '#b34b05'
    },{
      name: 'Purple Flowers'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251082/prplf.jpg'
      primary: '#ebb8ff'
      secondary: '#ebb8ff'
      tertiary: '#000000'
    },{
      name: 'Raspberries'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251100/raspb.jpg'
      primary: '#ffffff'
      secondary: '#ffffff'
      tertiary: '#000000'
    },{
      name: 'Speeding Cars'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,g_north,h_400,w_1200/v1425251183/spdcr.jpg'
      primary: '#242323'
      secondary: '#242323'
      tertiary: '#e6d5d1'
    },{
      name: 'Times Square'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251208/tmsqr.jpg'
      primary: '#de423a'
      secondary: '#de423a'
      tertiary: '#f2f3f1'
    },{
      name: 'Water and Sailboat'
      imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425251226/wslbt.jpg'
      primary: '#a80000'
      secondary: '#a80000'
      tertiary: '#ffffff'
    }
  ]

  _themes = [
    {
      primary: '#414141'
      secondary: '#414141'
      tertiary: '#FFFFFF'
    },
    {
      primary: '#FFFFFF'
      secondary: '#FFFFFF'
      tertiary: '#555555'
    },
    # Dark
    {
      primary: '#630000'
      secondary: '#630000'
      tertiary: '#FFFFFF'
    },
    {
      primary: '#632910'
      secondary: '#632910'
      tertiary: '#FFC6A5'
    },
    {
      primary: '#184A18'
      secondary: '#184A18'
      tertiary: '#FF92D6'
    },
    {
      primary: '#08215A'
      secondary: '#08215A'
      tertiary: '#E0E0E0'
    },
    {
      primary: '#4A0042'
      secondary: '#4A0042'
      tertiary: '#FFFF9C'
    },
    # Regular
    {
      primary: '#FF6342'
      secondary: '#FF6342'
      tertiary: '#FFFFFF'
    },
    {
      primary: '#FF9C4A'
      secondary: '#FF9C4A'
      tertiary: '#840000'
    },
    {
      primary: '#FFFF42'
      secondary: '#FFFF42'
      tertiary: '#555555'
    },
    {
      primary: '#52B552'
      secondary: '#52B552'
      tertiary: '#FFFFFF'
    },
    {
      primary: '#63C6DE'
      secondary: '#63C6DE'
      tertiary: '#FFFF9C'
    },
    {
      primary: '#9C7BBD'
      secondary: '#9C7BBD'
      tertiary: '#AD0000'
    },
    {
      primary: '#DE5AAD'
      secondary: '#DE5AAD'
      tertiary: '#FFFFFF'
    },
    # Light
    {
      primary: '#FFE7C6'
      secondary: '#FFE7C6'
      tertiary: '#D66321'
    },
    {
      primary: '#F7FFCE'
      secondary: '#F7FFCE'
      tertiary: '#3152A5'
    },
    {
      primary: '#C6E7DE'
      secondary: '#C6E7DE'
      tertiary: '#FF3118'
    },
    {
      primary: '#C6EFF7'
      secondary: '#C6EFF7'
      tertiary: '#103910'
    },
    {
      primary: '#C6B5DE'
      secondary: '#C6B5DE'
      tertiary: '#333333'
    },
    {
      primary: '#F7BDDE'
      secondary: '#F7BDDE'
      tertiary: '#08215A'
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
    theme: angular.copy(_themes[0])
    signup:
      products: []

  ## EXPORTS
  # show:   _show
  data:   _data
  themes: _themes

  landingUser: _userDefaults
