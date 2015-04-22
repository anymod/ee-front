module = angular.module 'ee-save', []

angular.module('ee-save').directive "eeSave", (eeDefiner, eeAuth, eeModal) ->
  templateUrl: 'components/ee-save.html'
  restrict: 'E'
  scope: {}
  link: (scope, ele, attr) ->
    scope.ee = eeDefiner.exports

    setBtnText    = (txt) -> scope.btnText = txt
    resetBtnText  = ()    -> setBtnText 'Save'
    resetBtnText()

    scope.$watch 'ee.user', (newVal, oldVal) ->
      if !!oldVal.email and !angular.equals(newVal, oldVal)
        scope.ee.unsaved = true
        resetBtnText()
    , true

    scope.save = () ->
      setBtnText 'Saving'
      eeAuth.fns.saveUser()
      .then     () -> scope.ee.unsaved = false
      .catch    () -> scope.ee.unsaved = true
      .finally  () -> setBtnText 'Saved'

    scope.saveModal = () -> eeModal.fns.openSignupModal()

    return
