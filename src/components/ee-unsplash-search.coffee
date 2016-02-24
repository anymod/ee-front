module = angular.module 'ee-unsplash-search', []

angular.module('ee-unsplash-search').directive "eeUnsplashSearch", ($rootScope, $http) ->
  templateUrl: 'components/ee-unsplash-search.html'
  restrict: 'EA'
  scope:
    appId: '@'
  link: (scope, ele, attr) ->
    scope.query = null
    scope.results = []

    scope.search = () ->
      $.ajax
        url: "https://api.unsplash.com/photos/search?page=1&per_page=40&query=" + encodeURIComponent(scope.query) + "&client_id=bb64366c7e2bfbc3d61c7425fe081f222a43e624dcd351c8ac6586525656c602"
        type: 'GET'
        dataType: 'json'
      .done (data) ->
        scope.results = data
        scope.$apply()

    scope.broadcast = (urls) ->
      $rootScope.$broadcast 'unsplash:urls', urls

    return
