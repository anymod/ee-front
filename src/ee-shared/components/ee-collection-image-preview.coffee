'use strict'

module = angular.module 'ee-collection-image-preview', []

module.directive "eeCollectionImagePreview", ($state, $window, $timeout, eeCollections) ->
  templateUrl: 'ee-shared/components/ee-collection-image-preview.html'
  restrict: 'E'
  scope:
    collection: '='
  link: (scope, ele, attrs) ->
    maxWidth = 800
    maxHeight = 470
    padding = 0
    scope.styles = ['bold', 'italic', 'underline', 'strikethrough']

    # Base Path
    base_path = 'https://res.cloudinary.com/eeosk/image/upload'

    # Base Image
    base_image = scope.collection.banner?.split('/upload/')[1] # TODO add option based on || 'https://placeholdit.imgix.net/~text?bg=ffffff&w=800&h=470'

    # Base Transform
    base_transform = 'w_' + maxWidth + ',h_' + maxHeight

    scope.layers = []

    # Text Background Overlay
    scope.bg_overlay =
      l: 'hue_bar'
      g: 'south_west'
      w: 800
      h: 60
      y: 0
      x: 0
      r: 0
      e: 'colorize'
      co_rgb: '#0099FF'
      o: 60

    # Text Overlay
    scope.text_overlay =
      text:
        family: 'Roboto'
        size: 30
        message: (scope.collection.headline || '')
        bold: false
        italic: false
        strikethrough: false
      g: 'south_west'
      w: 780
      h: 450
      c: 'fit'
      x: 20
      y: 20
      co_rgb: '#FFF'

    scope.layers.push scope.bg_overlay
    scope.layers.push scope.text_overlay

    scope.text_overlay_2 = angular.copy scope.text_overlay

    scope.layers.push scope.text_overlay_2

    scope.$on 'slideEnded', () ->
      for layer in scope.layers
        if layer.temp?.maxY then layer.h = parseInt(layer.temp.maxY) - parseInt(layer.y)
        if layer.temp?.maxX then layer.w = parseInt(layer.temp.maxX) - parseInt(layer.x)
      scope.construct()
      scope.$apply()

    enforceSizing = () ->
      for layer in scope.layers
        if layer.w > maxWidth  then layer.w = maxWidth - layer.x
        if layer.h > maxHeight then layer.h = maxHeight - layer.y

    setTemp = () ->
      for layer in scope.layers
        layer.temp =
          maxY: parseInt(layer.h) + parseInt(layer.y)
          maxX: parseInt(layer.w) + parseInt(layer.x)
      enforceSizing()
    setTemp()

    formString = (obj) ->
      strs = []
      for key in Object.keys(obj)
        if key is 'temp' or key.indexOf('$') > -1
          'Do nothing'
        else if key is 'text'
          str = 'l_text:' + encodeURI(obj.text.family) + '_' + obj.text.size
          for style in scope.styles
            if obj.text[style] then str += '_' + style
          strs.unshift(str + ':' + encodeURI(obj.text.message))
        else
          punct = if key.indexOf('e_') is 0 or key.indexOf('co_') is 0 then ':' else '_'
          val = encodeURI(obj[key])
          if key is 'co_rgb' then val = val.replace('#','')
          strs.push(key + punct + val)
      strs.join(',')

    formStrings = (arr) ->
      res = []
      res.push(formString elem) for elem in arr
      res

    scope.url = ''
    scope.construct = () ->
      enforceSizing()
      parts = [base_path, base_transform]
      parts = parts.concat(formStrings(scope.layers))
      parts.push(base_image)
      scope.url = parts.join('/')

    scope.rzSliderForceRender = () ->
      console.log 'rzSliderForceRender'
      $timeout () -> scope.$broadcast('rzSliderForceRender')

    scope.construct()

    return

# Examples
# https://res.cloudinary.com/eeosk/image/upload/w_600/l_hue_bar,g_south_west,w_0.6,h_0.2,fl_relative,e_hue:55,o_60/l_text:Doppio%20One_20:Get%20Cooking%0ATools%20For%20The%20Chef,g_south_west,y_20,x_10,co_rgb:eee/v1439837012/banner/uzzgq1ekvvc4qxmcmswj.jpg
# https://res.cloudinary.com/eeosk/image/upload/l_hue_bar,g_south_west,w_0.6,h_0.3,fl_relative,y_10,x_10,e_hue:55,e_brightness:99,o_60/l_text:Doppio%20One_40:Get%20Cooking:%0ATools%20For%20The%20Chef,g_south_west,y_20,x_20,co_rgb:333/v1439837012/banner/uzzgq1ekvvc4qxmcmswj.jpg
