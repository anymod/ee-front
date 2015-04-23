'use strict'

angular.module('builder.example').controller 'exampleCtrl', (eeLanding) ->

  this.ee = {}

  this.show = eeLanding.show

  this.openExampleModal = () ->
    eeLanding.fns.openExampleModal()
    return

  this.ee.meta =
    home:
      name: 'Demo Store'
      topBarBackgroundColor: '#83bec3'
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

  example_products = [
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429114377/jmmsrojayjmq9xi1napc.jpg' }
      title: 'Colorful Stripe Woven Fabric Shoulder Bag'
      selling_price: 5415
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115629/l5icqvt3vbgsfgkljcep.jpg' }
      title: 'Simplemente Delicioso Orinda 16-Piece Dinnerware Set-Orange'
      selling_price: 9799
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115651/ddm1miyodkbxc80tcmib.jpg' }
      title: 'Garden Tools Carry Bag'
      selling_price: 6749
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115648/hmmgo7ewmumsnulf0jwj.jpg' }
      title: 'Urban 880 Fire Pit'
      selling_price: 11499
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115610/eb2rv43ay4xeadcjwhea.jpg' }
      title: 'Slitzer™ 16pc Cutlery Set in Wood Block'
      selling_price: 4268
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115659/bawzqqy34prnvivqixev.jpg' }
      title: 'Merry Products Folding Eucalyptus Durable Outdoor Dining Table'
      selling_price: 25999
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115212/mirqazdfxsa5swcbr28i.jpg' }
      title: 'Ionic Turbo Hair Dryer/Styler'
      selling_price: 2288
    },
    {
      image_meta: { main_image: url: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429114962/v0p3xgbfgm0wxk2klmle.jpg' }
      title: 'Cherry Maurice Chevalier by Roger de Valerio- 24 x 32'
      selling_price: 6995
    }
  ]

  ## For ngInclude partials
  this.ee.carousel           = this.ee.meta?.home?.carousel[0]
  this.ee.product_selection  = example_products
  this.ee.categories = [
    'All',
    'Accessories',
    'Jewelry',
    'Outdoor',
    'Home Decor',
    'Health & Beauty'
  ]

  return
