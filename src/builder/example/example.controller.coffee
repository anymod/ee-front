'use strict'

angular.module('builder.example').controller 'exampleCtrl', () ->

  storefront = this

  storefront.ee = {}

  storefront.ee.User =
    user:
      storefront_meta:
        name: 'Home Accents'
        brand:
          text:
            x: 0
            y: 6
            family: 'Amaranth'
            size: 28
          color:
            primary: '#83bec3'
            secondary: '#83bec3'
            tertiary: '#021709'
          image:
            logo: 'https://res.cloudinary.com/eeosk/image/upload/v1436286705/storefront_logo/ef71mlcgxb4woms4fzfc.jpg'
        blog: { url: 'http://eeosk.com' }
        about: { headline: 'foobar' }
        audience:
          social:
            facebook:   'facebook'
            twitter:    'twitter'
            pinterest:  'pinterest'
            instagram:  'instagram'

  ## For ngInclude partials
  storefront.ee.Collections =
    nav:
      alphabetical: [
        { id: 2, title: 'Apartment Living' }
        { id: 3, title: 'French Inspired Design' }
        { id: 4, title: 'Farmhouse Favorites' }
        { id: 5, title: 'Gardening' }
        { id: 6, title: 'Kitchen Furniture' }
        { id: 7, title: 'Wood Grains' }
        { id: 8, title: 'Outdoor Fun' }
        { id: 9, title: 'Cooking Tools' }
        { id: 10, title: 'Gifts' }
        { id: 11, title: 'Patio Furniture' }
        { id: 12, title: 'Mirrors' }
      ]
      carousel: [
        { id: 2, title: 'Southern charm: style for your home', banner: 'https://res.cloudinary.com/eeosk/image/upload/v1440603589/banner/lowoyisi8p6edgktgawy.jpg', in_carousel: true }
      ]

  storefront.ee.Products =
    storefront:
      products: [
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115333/hijrsxnoedec3uraxc51.jpg'
          title: 'Classy Ceramic Garden Stool Open- Work Green'
          selling_price: 17099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115296/uwrh6viymxdsbzvownny.jpg'
          title: 'Mesmerizing Styled Glass Candle Holder'
          selling_price: 4099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115310/liw9altlnsjdgi9iceyi.jpg'
          title: 'Leather Mirror with Leather Finish and Brass Metallic Rivets'
          selling_price: 15099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115317/td2znaggsqygklxzl9lx.jpg'
          title: 'The Beautiful Wood Real Leather Magazine Holder'
          selling_price: 9099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115300/sfo5fpintcaaivn4qep7.jpg'
          title: 'Metal Wall Clock (24" Diameter)'
          selling_price: 5499
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115315/qxacopwjbkfg212wyzcy.jpg'
          title: 'Global worldly wood metal wall panel'
          selling_price: 13599
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115173/l60quadwge0cvcir7rft.jpg'
          title: 'Manhattans Coppice Exclusive Basket Dresser'
          selling_price: 22599
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115173/vndcqkccfxy46tlaiqmh.jpg'
          title: 'Console with Additional Storage Capability and Brass Handles'
          selling_price: 18099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115301/jhhn5wbenblqts2752ry.jpg'
          title: 'Artistic Stars Decorative Wall Art Furnishings'
          selling_price: 3099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115302/oh9cgsiuotyo4gorqvrs.jpg'
          title: 'Wall Accent Mirrors- Metal Mirror 35"W, 34"H'
          selling_price: 10999
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115300/u1d5tqq0jlpbhrqz0kba.jpg'
          title: 'A Pair of Poly Stone Sitting Labrador with Wooden Bookend'
          selling_price: 29099
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115332/b7kujwg6dqdnsosgx4yb.jpg'
          title: 'Bulldog with Bow Tie in Resin'
          selling_price: 3899
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115296/bdes8xdnz2em7dy1dtxk.jpg'
          title: 'Ceramic 16" Rooster in White Shade'
          selling_price: 4899
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115158/xgnhj4tes7m6shl3iqgb.jpg'
          title: 'Adjustable Logan Metal Stool with Wood Seat'
          selling_price: 8999
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429115614/ilkahrcliyf6tgja4hqr.jpg'
          title: 'Maxam® Chrome Heavy-Duty Professional Juicer'
          selling_price: 6499
        },
        {
          image: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,w_150,h_150/v1429114984/bcffxksjshooyqino7ys.jpg'
          title: 'Dorado: Aristide Bruant dans son Cabaret (20 x 30 Framed Poster)'
          selling_price: 6999
        }
      ]

  return
