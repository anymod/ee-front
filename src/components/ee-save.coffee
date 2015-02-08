module = angular.module 'ee-save', []

angular.module('ee-save').directive "eeSave", (eeAuth) ->
  templateUrl: 'components/ee-save.html'
  restrict: 'E'
  # scope: {}
  link: (scope, ele, attr) ->
    scope.saving = false
    scope.text = 'save'

    scope.user = eeAuth.getUser()

    scope.$watch 'user', (newValue, oldValue) ->
      console.log 'changed'
    , true

    scope.save = () ->
      scope.saving = true
      scope.text = 'saving...'
      eeAuth.saveUser()
      .then () ->
        scope.saving = false
        scope.text = 'save'
      .catch (err) ->
        scope.saving = false
        scope.text = err
      return

    return
