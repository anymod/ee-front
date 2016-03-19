'use strict'

angular.module('builder.edit').config ($stateProvider) ->

  views =
    header:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/edit/edit.header.html'
    top:
      controller: 'editCtrl as edit'
      templateUrl: 'builder/edit/edit.html'
    middle:
      controller: 'storefrontCtrl as storefront'
      templateUrl: 'builder/edit/edit.preview.html'

  data =
    pageTitle:        'Edit your store | eeosk'
    pageDescription:  'Edit the look and feel of your online store.'
    padTop:           '111px'

  $stateProvider
    .state 'edit',
      url:    '/edit'
      views:  views
      data:   data

    .state 'editlogo',
      url: '/edit/logo'
      views:
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.logo.html'
      data:
        pageTitle: 'Edit your logo | eeosk'
        padTop:    '0px'

    .state 'editcolors',
      url: '/edit/colors'
      views:
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.colors.html'
      data:
        pageTitle: 'Edit your colors | eeosk'
        padTop:    '0px'

    .state 'editsocial',
      url: '/edit/social'
      views:
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.social.html'
      data:
        pageTitle: 'Edit your social | eeosk'
        padTop:    '0px'

    .state 'editcategories',
      url: '/edit/categories'
      views:
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.categories.html'
      data:
        pageTitle: 'Edit your categories | eeosk'
        padTop:    '0px'

    # .state 'edit.topbar',
    #   url:    '/topbar'
    #   views:  views
    # .state 'editdesign',
    #   url:    '/edit/design'
    #   views:
    #     header:
    #       controller: 'storefrontCtrl as storefront'
    #       templateUrl: 'builder/edit/edit.header.html'
    #     top:
    #       controller: 'editCtrl as edit'
    #       templateUrl: 'builder/edit/edit.design.html'
    #     middle:
    #       controller: 'storefrontCtrl as storefront'
    #       templateUrl: 'builder/edit/edit.preview.html'
    #   data:
    #     pageTitle:        'Edit your store | eeosk'
    #     pageDescription:  'Edit the look and feel of your online store.'
    #     padTop:           '110px'
    # .state 'edit.social',
    #   url:    '/social'
    #   views:  views
    .state 'edit.about',
      url:    '/about'
      views:  views
    # .state 'edit.blog',
    #   url:    '/blog'
    #   views:  views
    # .state 'edit.seo',
    #   url:    '/seo'
    #   views:  views

  return
