'use strict'

module = angular.module 'ee-canvas', []

module.directive "eeCanvas", ($rootScope, $q, $filter, $window, $timeout) ->
  templateUrl: 'components/ee-canvas.html'
  restrict: 'E'
  scope:
    products: '='
    json: '='
    banner: '='
    canvasType: '='
    canvasWidth: '='
    canvasHeight: '='
  link: (scope, ele, attrs) ->
    scope.products  ||= []
    scope.layers      = []
    scope.json      ||= {}
    scope.tab         = {}
    scope.overlay     = null
    scope.toolset     = {}
    scope.textToAdd   = ''

    scope.canvasType ||= 'collection'
    scope.canvasWidth ||= 800
    scope.canvasHeight ||= 420
    scope.wellWidth = scope.canvasWidth + 12

    ### CANVAS SETUP ###

    canvas = new fabric.Canvas(scope.canvasType + '_canvas', {
      selection: false
      controlsAboveOverlay: true
      allowTouchScrolling: true
      centeredScaling: true
    })

    objectDefaults =
      hasRotatingPoint: false
      transparentCorners: false
      cornerColor: '#03A9F4'
      borderColor: '#03A9F4'
      cornerSize: 25
      padding: 5
      selectable: false
      evented: false

    removeControlPoints = (obj) ->
      return if obj.get('type') is 'rect' or obj.get('type') is 'ellipse'
      obj.setControlVisible(point, false) for point in ['mt','mr','mb','ml']

    #### GENERAL OPERATIONS ###

    sa = () -> scope.$apply()
    renderAll = () -> canvas.renderAll.bind(canvas)

    clearAll = () ->
      closeOverlay()
      clearToolset()
      sortLayers()
      deactivateAll()
      $timeout sa, 200

    setInteractivityTo = (obj, bool) ->
      obj.active = bool
      obj.selectable = bool
      obj.evented = bool
      renderAll()

    scope.setOverlay = (prop) ->
      deactivateAll()
      setToolset null
      scope.overlay = prop
      renderAll()
      $timeout sa, 200

    # ADDING

    setToolset = (target) ->
      if !target then return clearToolset()
      scope.toolset.tab = target.get 'type'
      if scope.toolset.tab is 'i-text'
        scope.toolset.bold      = target.getFontWeight() is 'bold'
        scope.toolset.italic    = target.getFontStyle() is 'italic'
        scope.toolset.underline = target.getTextDecoration() is 'underline'

    # SORTING

    sortLayers = () ->
      scope.layers = []
      canvas.getObjects().map (obj) ->
        if obj.get('type') is 'image' then obj.src = obj.getSrc()
        scope.layers.push obj
      canvas.bringToFront obj for obj in scope.layers
      renderAll()

    # REMOVING

    closeOverlay = () -> scope.overlay = null

    clearToolset = () ->
      scope.toolset.tab = null
      scope.toolset.addType = null
      scope.toolset.transparency = 0
      scope.toolset.whitespaceThreshold = 0
      scope.toolset.whitespaceDistance = 0

    clearObject = (obj) ->
      obj[prop] = objectDefaults[prop] for prop in Object.keys(objectDefaults)
      removeControlPoints obj
      $q (resolve, reject) ->
        if obj.get('type') is 'image' then obj.applyFilters () -> resolve true else resolve true

    deactivateAll = () ->
      for layer in scope.layers
        setInteractivityTo layer, false

    scope.reorderLayerBy = (layer, n) ->
      scope.focusLayer layer
      obj = canvas.getActiveObject()
      if n is 1 then obj.bringForward() else obj.sendBackwards()
      sortLayers()

    scope.focusLayer = (layer) ->
      scope.setOverlay null
      canvas.setActiveObject layer
      renderAll()

    # EVENTS

    scope.$on 'cloudinary:finished', (e, data) ->
      return if !data?.target
      if data.target is '1000x1000' then scope.addImage { url: data.url, crop: 'limit', w: scope.canvasWidth, h: scope.canvasWidth, scale: 1, background: true }
      if data.target is 'canvas'
        scope.banner = data.url
        $rootScope.$broadcast 'collection:update:banner', scope.banner

    scope.$on 'collection:updated', (e, data) ->
      scope.saving = false
      scope.unsaved = false

    scope.$on 'eeWebColorPicked', (e, color) ->
      switch scope.toolset.tab
        when 'rect', 'ellipse', 'circle', 'i-text'
          scope.toolset.transparency = 0
          canvas.getActiveObject().setColor color
          canvas.renderAll()
        else canvas.setBackgroundColor(color, renderAll())

    $window.addEventListener 'keydown', (e) ->
      # keyCode: 8, keyIdentifier: "U+0008" (delete)
      if e.keyCode is 8 and document.activeElement['type'] isnt 'text'
        scope.removeActiveObject()
        e.preventDefault()

    canvas.on 'object:selected', (options) ->
      deactivateAll()
      setInteractivityTo options.target, true
      setToolset options.target
    canvas.on 'after:render', (options) -> if !scope.unsaved then scope.unsaved = true
    canvas.on 'selection:cleared', (options) ->
      deactivateAll()
      setToolset null
      $timeout sa, 100

    ### IMAGE OPERATIONS ###

    scope.upload = () ->
      scope.saving = true
      sortLayers()
      scope.json = JSON.stringify(canvas)
      cloudinary_fileupload = $('#cloudinary_save .cloudinary_fileupload')
      canvas.discardActiveObject()
      data = canvas.toDataURL 'jpg'
      cloudinary_fileupload.fileupload('option', 'formData').file = data
      cloudinary_fileupload.fileupload 'add', { files: [ data ] }
      delete cloudinary_fileupload.fileupload('option', 'formData').file

    scope.preview = () ->
      deactivateAll()
      url = canvas.toDataURL 'image/jpeg'
      win = $window.open url, '_blank'
      win.focus()

    scope.loadFromJSON = () ->
      canvas.loadFromJSON scope.json, null, (o, object) ->
        scope.layers.push object
        clearObject(object).then () ->
          if !!object.fontFamily then loadFont(object.fontFamily, clearAll) else clearAll()
          cb = () -> scope.unsaved = false
          $timeout cb, 200

    scope.addImage = (opts) ->
      return if !opts or !opts.url
      opts.crop   ||= 'fit'
      opts.scale  ||= 0.5
      opts.w      ||= scope.canvasWidth
      opts.h      ||= scope.canvasHeight
      image = new Image()
      image.setAttribute 'crossOrigin', 'anonymous'
      image.src = $filter('cloudinaryResizeTo')(opts.url, opts.w, opts.h, opts.crop)
      image.onload = () ->
        img = new fabric.Image image, objectDefaults
        img.scale opts.scale
        removeControlPoints img
        img.lockRotation = true
        canvas.add img
        clearAll()
        canvas.setActiveObject img
      closeOverlay()

    scope.removeActiveObject = () ->
      activeObject = canvas.getActiveObject()
      if activeObject then canvas.remove activeObject
      sortLayers()

    removeWhite = () ->
      activeObject = canvas.getActiveObject()
      return if !activeObject
      activeObject.filters = [ new fabric.Image.filters.RemoveWhite({
        threshold: scope.toolset.whitespaceThreshold
        distance: scope.toolset.whitespaceDistance
      })]
      activeObject.applyFilters () -> canvas.renderAll()

    scope.updateWhitespace = () -> $timeout removeWhite, 100

    scope.$on 'unsplash:urls', (e, urls) ->
      scope.addImage { url: urls.regular, background: true }
      clearAll()

    ### TEXT OPERATIONS ###

    scope.addText = () ->
      txt = new fabric.IText scope.textToAdd, objectDefaults
      removeControlPoints txt
      canvas.add txt
      scope.textToAdd = ''
      clearAll()
      scope.focusLayer txt, true

    scope.toggleFontSetting = (setting) ->
      txt = canvas.getActiveObject()
      if txt
        switch setting
          when 'bold'
            scope.toolset.bold = !scope.toolset.bold
            if scope.toolset.bold then txt.setFontWeight 'bold' else txt.setFontWeight 'normal'
          when 'italic'
            scope.toolset.italic = !scope.toolset.italic
            if scope.toolset.italic then txt.setFontStyle 'italic' else txt.setFontStyle 'normal'
          when 'underline'
            scope.toolset.underline = !scope.toolset.underline
            if scope.toolset.underline then txt.setTextDecoration 'underline' else txt.setTextDecoration 'normal'
        canvas.renderAll()

    loadFont = (font, cb) ->
      cb ||= () -> ''
      WebFont.load
        google: families: [font]
        active: cb

    scope.$on 'font:set', (e, font) ->
      txt = canvas.getActiveObject()
      cb = () ->
        txt.setFontFamily font
        canvas.renderAll()
      if txt then loadFont font, cb

    ### SHAPE OPERATIONS ###

    scope.addShape = (type) ->
      shape = null
      if type is 'rect'
        shape = new fabric.Rect objectDefaults
        shape.setFill 'rgba(200,200,200,0.8)'
        shape.width = 150
        shape.height = 100
      else if type is 'ellipse'
        shape = new fabric.Ellipse objectDefaults
        shape.setFill 'rgba(200,200,200,0.8)'
        shape.width = 150
        shape.height = 100
        shape.rx = 75
        shape.ry = 50
      if shape then canvas.add shape
      clearAll()
      scope.focusLayer shape, true

    scope.updateTransparency = () ->
      activeObject = canvas.getActiveObject()
      return if !activeObject or !scope.toolset.transparency
      fill = activeObject.getFill()
      opacity = 1 - scope.toolset.transparency
      if fill.indexOf('rgba') is 0
        parts = fill.split(',')
        parts[3] = '' + opacity + ')'
        fill = parts.join ','
      else if fill.indexOf('#') is 0
        fill = $filter('hexToRgba')(fill, opacity)
      activeObject.setFill fill
      canvas.renderAll()

    ### RUNTIME ###

    scope.clear = () -> clearAll()
    clearAll()
    scope.loadFromJSON()

    disableScroll = () -> canvas.allowTouchScrolling = false
    enableScroll = () -> canvas.allowTouchScrolling = true
    canvas.on 'object:moving', disableScroll
    canvas.on 'object:scaling', disableScroll
    canvas.on 'object:rotating', disableScroll
    canvas.on 'mouse:up', enableScroll

    return
