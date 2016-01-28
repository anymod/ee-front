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
    scope.base_path = 'https://res.cloudinary.com/eeosk/image/upload'
    scope.base_transform = 'w_' + maxWidth + ',h_' + maxHeight
    scope.base_image = null
    scope.styles = ['bold', 'italic', 'underline', 'strikethrough']

    # base_layer =
    #   base: true
    #   image: scope.collection.banner
    #   o: 100
    #
    # # Text Background Overlay
    # bg_overlay =
    #   l: 'hue_bar'
    #   g: 'south_west'
    #   w: 800
    #   h: 60
    #   y: 0
    #   x: 0
    #   r: 0
    #   e: 'colorize'
    #   co_rgb: '#0099FF'
    #   o: 60
    #
    # # Text Overlay
    # text_overlay =
    #   text:
    #     family: 'Roboto'
    #     size: 30
    #     message: (scope.collection.headline || '')
    #     bold: false
    #     italic: false
    #     strikethrough: false
    #   g: 'south_west'
    #   w: 780
    #   h: 450
    #   c: 'fit'
    #   x: 20
    #   y: 20
    #   co_rgb: '#FFF'

    console.log 'scope.collection.layers', scope.collection.layers
    scope.layers = scope.collection.layers || []

    # scope.layers.push base_layer
    # scope.layers.push bg_overlay
    # scope.layers.push text_overlay

    scope.$on 'slideEnded', () ->
      setDimensions()
      scope.construct()

    scope.$on 'eeWebColorPicked', () -> $timeout () -> scope.construct()

    scope.$on 'cloudinaryUploadFinished', () ->
      console.log 'cloudinaryUploadFinished', scope.collection.banner
      for layer in scope.layers
        if layer.base
          layer.image = scope.collection.banner
          layer.o = 100
      scope.construct()

    setDimensions = () ->
      for layer in scope.layers
        if !layer.base
          if layer.temp?.maxY then layer.h = parseInt(layer.temp.maxY) - parseInt(layer.y)
          if layer.temp?.maxX then layer.w = parseInt(layer.temp.maxX) - parseInt(layer.x)

    enforceSizing = () ->
      for layer in scope.layers
        if !layer.base
          if layer.w > maxWidth  then layer.w = maxWidth - layer.x
          if layer.h > maxHeight then layer.h = maxHeight - layer.y

    setTemp = () ->
      for layer in scope.layers
        if !layer.base
          layer.temp =
            maxY: parseInt(layer.h) + parseInt(layer.y)
            maxX: parseInt(layer.w) + parseInt(layer.x)
      enforceSizing()
    setTemp()

    formBase = () ->
      for layer in scope.layers
        if layer.base
          parts = layer.image?.split('/')
          scope.base_image = parts?.slice(Math.max(parts.length - 3, 1)).join('/')
          scope.base_transform = 'w_' + maxWidth + ',h_' + maxHeight
          if layer.o or layer.o is 0 then scope.base_transform += ',o_' + layer.o
      [scope.base_path, scope.base_transform]

    formString = (layer) ->
      return if layer.base
      strs = []
      for key in Object.keys(layer)
        if key is 'temp' or key.indexOf('$') > -1
          # Do nothing
        else if key is 'text'
          str = 'l_text:' + encodeURI(layer.text.family) + '_' + layer.text.size
          for style in scope.styles
            if layer.text[style] then str += '_' + style
          strs.unshift(str + ':' + escape(encodeURIComponent(layer.text.message))) # double encode to avoid URL issues
        else
          punct = if key.indexOf('e_') is 0 or key.indexOf('co_') is 0 then ':' else '_'
          val = encodeURI(layer[key])
          if key is 'co_rgb' then val = val.replace('#','')
          strs.push(key + punct + val)
      strs.join(',')

    formStrings = (arr) ->
      res = []
      res.push(formString elem) for elem in arr
      res

    updateCollection = () ->
      scope.collection.banner = scope.url
      scope.collection.layers = scope.layers

    scope.url = ''
    scope.construct = () ->
      enforceSizing()
      parts = formBase(scope.layers).concat(formStrings(scope.layers)).concat(scope.base_image)
      scope.url = parts.join('/')
      updateCollection()
      $timeout () ->
        scope.$broadcast 'rzSliderForceRender'
        scope.$apply()

    scope.rzSliderForceRender = () ->
      $timeout () ->
        scope.$broadcast 'reCalcViewDimensions'
        scope.$broadcast 'rzSliderForceRender'

    scope.resetMainImage = () ->
      for layer in scope.layers
        if layer.base then layer.o = 0
      scope.construct()

    scope.construct()

    return

# Examples
# https://res.cloudinary.com/eeosk/image/upload/w_600/l_hue_bar,g_south_west,w_0.6,h_0.2,fl_relative,e_hue:55,o_60/l_text:Doppio%20One_20:Get%20Cooking%0ATools%20For%20The%20Chef,g_south_west,y_20,x_10,co_rgb:eee/v1439837012/banner/uzzgq1ekvvc4qxmcmswj.jpg
# https://res.cloudinary.com/eeosk/image/upload/l_hue_bar,g_south_west,w_0.6,h_0.3,fl_relative,y_10,x_10,e_hue:55,e_brightness:99,o_60/l_text:Doppio%20One_40:Get%20Cooking:%0ATools%20For%20The%20Chef,g_south_west,y_20,x_20,co_rgb:333/v1439837012/banner/uzzgq1ekvvc4qxmcmswj.jpg
# https://res.cloudinary.com/eeosk/image/upload/w_800,h_470,o_100/l_rcddzr6uirxwthic8szw,c_fit,w_200,h_200,x_10,y_10,r_max,g_south_west/l_rcddzr6uirxwthic8szw,c_fit,w_200,h_200,x_220,y_10,g_south_west/l_rcddzr6uirxwthic8szw,c_fit,w_200,h_200,x_430,y_10,g_south_west/l_hue_bar,g_south_west,w_291,h_100,y_277,x_509,r_0,e_colorize,co_rgb:FF9933,o_77/l_text:Berkshire%20Swash_35_italic:Get%20Cooking:%20Tools%20for%20the%20Chef,g_south_west,w_269,h_181,c_fit,x_531,y_289,co_rgb:FFF/v1439837012/banner/uzzgq1ekvvc4qxmcmswj.jpg
