'use strict'

angular.module('builder.create').config ($stateProvider, $locationProvider) ->

  $stateProvider
    .state 'create',
      url: '/create/:token'
      views:
        header:
          templateUrl: 'builder/create/create.header.html'
        top:
          controller: 'createCtrl as create'
          templateUrl: 'builder/create/create.html'
      data:
        pageTitle: 'Create your store'
        padTop: '200px'

    .state 'create-finishing',
      url: '/create/:token/finishing'
      views:
        header:
          templateUrl: 'builder/create/create.header.html'
        top:
          controller: 'createCtrl as create'
          templateUrl: 'builder/create/create.finishing.html'
      data:
        pageTitle: 'Create your store'
        padTop: '200px'
