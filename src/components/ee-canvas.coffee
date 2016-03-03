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
    scope.layers = []
    scope.json      ||= {}
    scope.tab = {}
    scope.overlay = {}
    scope.toolset = {}

    scope.canvasType ||= 'collection'
    scope.canvasWidth ||= 800
    scope.canvasHeight ||= 420
    scope.wellWidth = scope.canvasWidth + 12

    ### CANVAS SETUP ###

    canvas = new fabric.Canvas(scope.canvasType + '_canvas')
    canvas.selection = false
    canvas.controlsAboveOverlay = true
    # background = null
    # backgroundFillCode = 'rgba(123,123,123,0.123)' # Use fill code to identify as background image in loadFromJSON

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

    sortLayers = () ->
      objLayers = []
      txtLayers = []
      scope.layers = []
      canvas.getObjects().map (obj) ->
        if obj.get('type') is 'image' then obj.src = obj.getSrc()
        scope.layers.push obj
        switch obj.get 'type'
          when 'i-text' then txtLayers.push obj
          else objLayers.push obj # (if obj isnt background then objLayers.push obj)
      canvas.bringToFront obj for obj in objLayers
      canvas.bringToFront obj for obj in txtLayers
      renderAll()

    closeOverlays = () ->
      scope.overlay.text = false
      scope.overlay.product = false
      scope.overlay.unsplash = false

    resetToolset = () ->
      scope.toolset.tab = null
      scope.toolset.transparency = 0
      scope.toolset.whitespaceThreshold = 0
      scope.toolset.whitespaceDistance = 0

    resetCanvas = (full) ->
      # unfocusBackground()
      closeOverlays()
      resetToolset()
      sortLayers()

    resetObject = (obj) ->
      obj[prop] = objectDefaults[prop] for prop in Object.keys(objectDefaults)
      removeControlPoints obj
      $q (resolve, reject) ->
        if obj.get('type') is 'image' then obj.applyFilters () -> resolve true else resolve true

    setToolset = (target) ->
      if !target then return resetToolset()
      scope.toolset.tab = target.get 'type'
      if scope.toolset.tab is 'i-text'
        scope.toolset.bold      = target.getFontWeight() is 'bold'
        scope.toolset.italic    = target.getFontStyle() is 'italic'
        scope.toolset.underline = target.getTextDecoration() is 'underline'

    setInteractivityTo = (obj, bool) ->
      obj.selectable = bool
      obj.evented = bool
      renderAll()

    deactivateAll = () ->
      for layer in scope.layers
        setInteractivityTo layer, false

    # setVisibilityTo = (obj, bool) ->
    #   obj.selectable = bool
    #   opacity = if bool then 1 else 0
    #   obj.set 'opacity', opacity
    #   renderAll()

    setAllVisibilityTo = (bool) ->
      canvas.getObjects().map (obj) -> setVisibilityTo obj, bool

    scope.focusLayer = (layer) ->
      canvas.setActiveObject layer
      renderAll()

    scope.toggleOverlay = (prop) -> scope.overlay[prop] = !scope.overlay[prop]

    scope.moveToBack = () ->
      canvas.sendToBack canvas.getActiveObject()
      sortLayers()

    ### BACKGROUND IMAGE OPERATIONS ###

    # scope.backgroundSet = () -> !!background
    #
    # setBackgroundImage = (img, focus) ->
    #   if background then canvas.remove background
    #   background = img
    #   img.setFill backgroundFillCode # Use fill code to identify as background image in loadFromJSON
    #   canvas.add img
    #   sortLayers()
    #   if focus then scope.focusBackground()
    #
    # scope.removeBackgroundImage = () ->
    #   if background then canvas.remove background
    #   background = null
    #
    # scope.focusBackground = () ->
    #   setAllVisibilityTo false
    #   canvas.deactivateAll().renderAll()
    #   if background
    #     setVisibilityTo background, true
    #     canvas.setActiveObject background
    #     canvas.bringToFront background
    #   scope.toolset.tab = 'background'
    #
    # scope.unfocusBackground = () ->
    #   scope.tab.layers = true
    #   setAllVisibilityTo true
    #   if background
    #     canvas.sendToBack background
    #     background.selectable = false
    #   canvas.deactivateAll()
    #   resetCanvas()

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

    scope.loadFromJSON = () ->
      canvas.loadFromJSON scope.json, null, (o, object) ->
        # if o.fill is backgroundFillCode then setBackgroundImage object
        scope.layers.push object
        resetObject(object).then () ->
          if !!object.fontFamily then loadFont(object.fontFamily, resetCanvas) else resetCanvas()
          # scope.unfocusBackground()
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
        # if opts.background then setBackgroundImage(img, true) else canvas.add img
        canvas.add img
      closeOverlays()

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
        # if canvas.getActiveObject() is background then background = null
        scope.removeActiveObject()
        e.preventDefault()

    canvas.on 'object:selected', (options) ->
      # canvas.bringToFront options.target
      # sortLayers()
      # console.log options.target
      deactivateAll()
      setInteractivityTo options.target, true
      # options.target.selectable = true
      # options.target.evented = true
      setToolset options.target
      # $timeout sa, 100
    canvas.on 'after:render', (options) -> if !scope.unsaved then scope.unsaved = true
    canvas.on 'selection:cleared', (options) ->
      deactivateAll()
      # resetCanvas()
      $timeout sa, 100

    ### IMAGE OPERATIONS ###

    scope.removeActiveObject = () ->
      activeObject = canvas.getActiveObject()
      if activeObject then canvas.remove activeObject

    scope.addRandomImage = () ->
      url = scope.products[Math.floor(Math.random() * scope.products.length)].image
      scope.addImage { url: url }

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
      resetCanvas()

    ### TEXT OPERATIONS ###

    scope.addText = (textToAdd) ->
      txt = new fabric.IText textToAdd, objectDefaults
      removeControlPoints txt
      canvas.add txt
      resetCanvas()

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
      resetCanvas()

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

    scope.reset = () -> resetCanvas()
    resetCanvas()
    scope.loadFromJSON()

    return
