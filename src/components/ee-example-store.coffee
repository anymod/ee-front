'use strict'

angular.module 'ee-example-store', []

angular.module('ee-example-store').directive "eeExampleStore", ($rootScope, $location, $anchorScroll) ->
  templateUrl: 'components/ee-example-store.html'
  scope:
    show: '='
  link: (scope, ele, attrs) ->
    scope.toggleBlock = (shw) ->
      $location.hash 'example-top'
      $anchorScroll()
      # Remove hash in url
      $location.url $location.path()
      shw.tryout = !shw.tryout

    scope.tryout = (shw) ->
      $rootScope.$broadcast 'initiate:tryItOut', shw
      return

    scope.user =
      storefront_meta:
        home:
          name: 'Demo Store'
          topBarBackgroundColor: '#526abf'
          topBarColor: '#ffffff'
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

    scope.example_products = [
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
        image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215844/tcxh7hqtgmaa1wzzvltj.jpg' }
        title: 'Ionic Turbo Hair Dryer/Styler'
        selling_price: 2288
      },
      {
        image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1427215978/nsy22jmwluzngng1y4go.jpg' }
        title: 'Urban 880 Fire Pit'
        selling_price: 11499
      }
    ]
