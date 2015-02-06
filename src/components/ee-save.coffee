module = angular.module 'ee-save', []

angular.module('ee-save').directive "eeSave", (eeBack) ->
  templateUrl: 'components/ee-save.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attr) ->

    scope.save = () ->
      eeBack.save()
      return

    return
