'use strict'

angular.module('builder.edit').config ($stateProvider) ->

  $stateProvider

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

    .state 'editabout',
      url:    '/about'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/edit/edit.header.html'
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.about.html'
      data:
        pageTitle:        'Edit your store | eeosk'
        pageDescription:  'Edit the look and feel of your online store.'
        padTop:           '111px'

    .state 'editseo',
      url: '/edit/seo'
      views:
        header:
          controller: 'storefrontCtrl as storefront'
          templateUrl: 'builder/edit/edit.header.html'
        top:
          controller: 'editCtrl as edit'
          templateUrl: 'builder/edit/edit.seo.html'
      data:
        pageTitle: 'Edit your logo | eeosk'
        padTop:    '111px'

  return
