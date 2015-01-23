angular.module 'EE.Previewer', ['hc.marked']

angular.module('EE.Previewer').directive "eePreviewer", (eeFullScreenSvc, eeGlobalSvc) ->
  templateUrl: 'components/ee-previewer.html'
  restrict: 'E'
  scope: {} # isolate scope otherwise has same scope as the ui-router state it's in
  link: (scope) ->
    scope.currentImgI = 0
    scope.setCurrentImgI = (i) -> scope.currentImgI = i; return

    scope.setFullScreen = eeFullScreenSvc.set
    scope.$on 'setFullScreen', (e, val) ->
      if val is false
        scope.setCurrentImgI 0
        eeGlobalSvc.removeBodyClass 'no-scroll'
      else
        eeGlobalSvc.addBodyClass 'no-scroll'
      return

    scope.product = {}
    scope.$on 'setProduct', (e, val) ->
      scope.product = val
      return

    return
