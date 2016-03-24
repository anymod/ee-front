module = angular.module 'ee-save', []

angular.module('ee-save').directive "eeSave", ($state, eeDefiner, eeUser) ->
  templateUrl: 'components/ee-save.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attr) ->
    scope.ee = eeDefiner.exports

    setBtnText    = (txt) -> scope.btnText = txt
    resetBtnText  = ()    -> setBtnText 'Save'
    resetBtnText()

    getDefaults = () ->
      scope.ee.User.payloadDefaults

    for attr in scope.ee.User.payloadDefaults
      watch = 'ee.User.user.' + attr
      scope.$watch watch, (newVal, oldVal) ->
        if oldVal and !angular.equals(newVal, oldVal)
          scope.ee.unsaved = true
          resetBtnText()
      , true

    scope.save = () ->
      setBtnText 'Saving'
      eeUser.fns.updateUser()
      .then () ->
        scope.ee.unsaved = false
        setBtnText 'Saved'
      .catch () ->
        scope.ee.unsaved = true
        setBtnText 'Error'

    return
