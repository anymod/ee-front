'use strict'

angular.module('builder.example').controller 'exampleCtrl', ($scope, $rootScope, $location, $anchorScroll, $timeout, eeLanding) ->

  this.show = eeLanding.show

  this.toggleBlock = (shw) ->
    $location.hash 'example-top'
    $anchorScroll()
    # Remove hash in url
    $location.url $location.path()
    shw.tryout = !shw.tryout
    return

  this.user =
    storefront_meta:
      home:
        name: 'Demo Store'
        topBarBackgroundColor: '#dbd6ff'
        topBarColor: '#021709'
        carousel: [{
          imgUrl: 'https://res.cloudinary.com/eeosk/image/upload/c_fill,h_400,w_1200/v1425250064/city_.jpg'
          headline: 'Demo store'
          byline: 'This is an example of what\'s possible'
          btnText: 'Build yours'
          btnPosition: 'right'
        }]
      blog: { url: 'http://eeosk.com' }
      about: { headline: 'foobar' }
      audience:
        social:
          facebook:   'facebook'
          twitter:    'twitter'
          pinterest:  'pinterest'
          instagram:  'instagram'

  this.example_products = [
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215234/oydybot7mzo85imnaw4j.jpg' }
      title: 'Colorful Stripe Woven Fabric Shoulder Bag'
      selling_price: 5415
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427216099/jkajiq9beknd7r0xdjxq.jpg' }
      title: 'Simplemente Delicioso Orinda 16-Piece Dinnerware Set-Orange'
      selling_price: 9799
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427217147/p5aewbyutw8lqwo981j3.jpg' }
      title: 'Garden Tools Carry Bag'
      selling_price: 6749
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215978/nsy22jmwluzngng1y4go.jpg' }
      title: 'Urban 880 Fire Pit'
      selling_price: 11499
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427217101/re3pwtarhompmvjblqve.jpg' }
      title: 'Slitzer™ 16pc Cutlery Set in Wood Block'
      selling_price: 4268
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215844/tcxh7hqtgmaa1wzzvltj.jpg' }
      title: 'Ionic Turbo Hair Dryer/Styler'
      selling_price: 2288
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215933/tdmayxdopcyw2faots0u.jpg' }
      title: 'Cherry Maurice Chevalier by Roger de Valerio- 24 x 32'
      selling_price: 6995
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427216263/oectgcycpjsgf74it4zf.jpg' }
      title: 'Mitaki-Japan® Wind-Up LED Head Lamp'
      selling_price: 549
    }
  ]

  ## For ngInclude partial
  $scope.carousel = this.user.storefront_meta.home.carousel[0]

  $scope.storefront =
    product_selection: this.example_products
    categories: [
      'All',
      'Accessories',
      'Jewelry',
      'Outdoor',
      'Home Decor',
      'Health & Beauty'
    ]

  return
