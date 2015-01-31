'use strict'

angular.module('app.core').run ($rootScope, $state, $cookies, $location, eeBack) ->

  # binding this so $state.current.data.pageTitle & other $state data can be accessed
  $rootScope.$state = $state

  $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
    openStates = [
      'landing',
      'login',
      'logout',
      'about',
      'signup'
    ]
    unless openStates.indexOf(toState.name) > -1 or eeBack.hasToken()
      event.preventDefault()
      $state.go 'login'

  $rootScope.eeUser =
    storefront:
      categories: {
        'New Arrivals'
        'Home Decor'
        'Paper'
        'Bags'
        'Jewelry'
        'Accessories'
        'Vintage'
        'Apparel'
      }
      home:
        name: 'Common Deer VT'
        topBarColor: '#f6f6f6'
        topBarBackgroundColor: '#222222'
        carousel:
          1:
            imgUrl: 'http://cdn.shopify.com/s/files/1/0269/1895/t/2/assets/slideshow_6.jpg?5116'
            headline: 'TOPO DESIGNS'
            byline: 'OUR FAVORITE PACKS'
            btnText: 'SHOP NOW'
            btnPosition: 'right'
            linkCategory: 'Bags'
      shop: {}
      blog:
        url: 'http://www.myblog.com'
      about:
        imgUrl: 'http://res.cloudinary.com/eeosk/image/upload/v1422583052/storefront_about/mkld3jahfvljsd0knnhh.jpg'
        headline: 'Common Deer was founded on the idea that life is better with a bit of character.'
        content: 'We also believe that “cheap” is actually quite expensive… in the long run.

So, we’re obsessed with awesome things that make us feel good. We comb vintage sales, auctions, craft fairs, etsy, and more to find products worthy of our Common Deer stamp. We love small business, small batch production and products that are USA-made, eco-friendly, fair-trade, re-purposed, or vintage. As we grow, we are working towards having our entire collection fit those buzz words. We know that with your help in supporting small business, new designers, artisans, and craftspeople it will result in collective success.

We want you to feel great about the products you purchase, how you decorate your home, and the gifts you give. At our core is the exploration of how it is made, the people behind the product, and why. The story is what sells us – and we encourage you to think more about “the story” behind what you’re purchasing even outside of Common Deer.

The people behind Common Deer…\n\nYes, it’s a family.

With Sharon at the helm, the Beal family is on an adventure. With over 40 years in the business world, Sharon decided it was finally time to make an impact while pursuing her passion for décor and fine things. With an eye for design and a passion for supporting small business – Sharon is obsessed with “the story” behind each product and “putting it all together.” John, Sarah, and Johnny all provide support in managing aspects of the business, including the hunt for cool things with character.

About the name…

No one ever said that naming a business is an easy feat. With many months, pre-mature domain name purchases, and endless brainstorms – landing on “Common Deer” – was a completely accident.

Yes, Common Deer is meant to be a play on “commandeer” – as we are a sailing family. Luckily, we are not the type to pirate your ship. Further breaking down the name – “Deer”, because we are nature-obsessed and are concerned with the impact of our items, environmentally, as well as socially. Also, it’s super fun to explain how to spell our name by throwing up hand antlers – do it, you’ll enjoy it too. “Common” because we know that if everyone would live with the ‘common good’ in mind, we would all benefit.

Common Deer - the act of making something your own by embracing the character and story behind each purchase and gift."'
      audience:
        social:
          facebook: 'CommonDeer'
          pinterest: 'commondeer'
          twitter: 'commondeervt'
          instagram: 'commondeer'
        contact:
          email: 'info@commondeervt.com'
          address:
            street1: '5224 Shelburne Rd'
            street2: 'Suite 102'
            city: 'Shelburne'
            state: 'VT'
            zip: '05482'
        newsletterSignup: true

  return
