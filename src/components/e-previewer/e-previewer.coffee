angular.module 'E.Previewer', ['hc.marked']

angular.module('E.Previewer').directive "ePreviewer", (eFullScreenSvc, eGlobalSvc) ->
  templateUrl: 'components/e-previewer/e-previewer.html'
  restrict: 'E'
  scope: {} # isolate scope otherwise has same scope as the ui-router state it's in
  link: (scope) ->
    scope.currentImgI = 0
    scope.setCurrentImgI = (i) -> scope.currentImgI = i; return

    scope.setFullScreen = eFullScreenSvc.set
    scope.$on 'setFullScreen', (e, val) ->
      if val is false
        scope.setCurrentImgI 0
        eGlobalSvc.removeBodyClass 'no-scroll'
      else
        eGlobalSvc.addBodyClass 'no-scroll'
      return

    scope.product = {}
    scope.$on 'setProduct', (e, val) ->
      scope.product = val
      return

    return
