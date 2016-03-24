'use strict'

angular.module('builder.core').factory 'eeLanding', ($rootScope, $timeout) ->

  ## SETUP
  _userDefaults =
    storefront_meta:
      brand:
        color:
          primary: '#dbd6ff'
          secondary: '#dbd6ff'
          tertiary: '#021709'
      audience:
        social:
          facebook: 'facebook'
          pinterest: 'pinterest'
          twitter: 'twitter'
          instagram: 'instagram'
      blog:
        url: 'http://blog.com'
    logo: 'https://res.cloudinary.com/eeosk/image/upload/c_pad,g_west,h_80,w_300/v1450227427/home_200x200.png'
    categorization_ids: [1,2,3,4,5,6]

  ## PRIVATE EXPORT DEFAULTS
  _data =
    user: angular.copy _userDefaults
    signup:
      products: []

  ## EXPORTS
  data: _data
