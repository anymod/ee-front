module = angular.module 'ee-save', []

angular.module('ee-save').directive "eeSave", ($timeout, eeAuth) ->
  templateUrl: 'components/ee-save.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attr) ->
    scope.userIsSaved = eeAuth.userIsSaved()
    scope.text = 'Saved'
    scope.userSaveSuccess = true

    eeAuth.setScopeUser(scope)

    scope.$watch 'user', (newValue, oldValue) ->
      if !!oldValue and newValue isnt oldValue
        scope.text = 'Save'
        scope.userIsSaved = false
        scope.userSaveSuccess = false
    , true

    scope.save = () ->
      scope.text = 'Saving...'
      scope.userSaveSuccess = false
      scope.userSaveError = false
      eeAuth.saveUser()
      .then () ->
        scope.userIsSaved = true
        scope.userSaveSuccess = true
        scope.text = 'Saved'
      .catch (err) ->
        scope.userIsSaved = false
        scope.userSaveError = true
        scope.text = if typeof err is 'string' then err else err.message
      return

    return
