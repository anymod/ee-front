'use strict'

module = angular.module 'ee-canvas', []

module.directive "eeCanvas", ($filter, $window, $timeout) ->
  templateUrl: 'components/ee-canvas.html'
  restrict: 'E'
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.products ||= []
    scope.background = null
    scope.unsplash = null
    scope.toolset = {}

    ### CANVAS SETUP ###

    canvas = new fabric.Canvas('c')
    canvas.selection = false
    canvas.controlsAboveOverlay = true

    objectDefaults =
      hasRotatingPoint: false
      transparentCorners: false
      cornerColor: '#03A9F4'
      borderColor: '#03A9F4'
      cornerSize: 25
      padding: 20

    #### GENERAL OPERATIONS ###

    sa = () -> scope.$apply()
    renderAll = () -> canvas.renderAll.bind(canvas)

    sortLayers = () ->
      objLayers = []
      txtLayers  = []
      canvas.getObjects().map (obj) ->
        switch obj.get 'type'
          when 'i-text' then txtLayers.push obj
          else (if obj isnt scope.background then objLayers.push obj)
      canvas.bringToFront obj for obj in objLayers
      canvas.bringToFront obj for obj in txtLayers
      renderAll()

    resetToolset = () ->
      scope.toolset.type = null
      scope.toolset.transparency = 0
      scope.toolset.whitespaceThreshold = 0
      scope.toolset.whitespaceDistance = 0

    setToolset = (target) ->
      if !target then return resetToolset()
      scope.toolset.type = target.get 'type'
      if scope.toolset.type is 'i-text'
        scope.toolset.bold      = target.getFontWeight() is 'bold'
        scope.toolset.italic    = target.getFontStyle() is 'italic'
        scope.toolset.underline = target.getTextDecoration() is 'underline'

    setVisibilityTo = (obj, bool) ->
      obj.selectable = bool
      opacity = if bool then 1 else 0
      obj.set 'opacity', opacity
      renderAll()

    setAllVisibilityTo = (bool) ->
      canvas.getObjects().map (obj) -> setVisibilityTo obj, bool

    scope.toggleUnsplash = () -> scope.unsplash = !scope.unsplash

    ### BACKGROUND IMAGE OPERATIONS ###

    setBackgroundImage = (imageInstance) ->
      if scope.background then canvas.remove scope.background
      scope.background = imageInstance
      canvas.add imageInstance
      sortLayers()
      # canvas.sendToBack imageInstance

    scope.removeBackgroundImage = () ->
      if scope.background then canvas.remove scope.background
      scope.background = null

    scope.focusBackground = () ->
      setAllVisibilityTo false
      canvas.deactivateAll().renderAll()
      if scope.background
        setVisibilityTo scope.background, true
        canvas.setActiveObject scope.background
        canvas.bringToFront scope.background
      scope.toolset.type = 'background'

    scope.unfocusBackground = () ->
      setAllVisibilityTo true
      if scope.background
        canvas.sendToBack scope.background
        scope.background.selectable = false
      canvas.deactivateAll()
      setToolset null
      scope.unsplash = false
      sortLayers()

    scope.upload = () ->
      canvas.discardActiveObject()
      data = canvas.toDataURL 'jpg'
      cloudinary_fileupload.fileupload('option', 'formData').file = data
      cloudinary_fileupload.fileupload 'add', { files: [ data ] }
      delete cloudinary_fileupload.fileupload('option', 'formData').file

    scope.addImage = (opts) ->
      return if !opts or !opts.url
      opts.crop   ||= 'fit'
      opts.scale  ||= 0.5
      opts.w      ||= 800
      opts.h      ||= 420

      img = new Image()
      img.setAttribute 'crossOrigin', 'anonymous'
      img.src = $filter('cloudinaryResizeTo')(opts.url, opts.w, opts.h, opts.crop)
      img.onload = () ->
        imgInstance = new fabric.Image img, objectDefaults
        imgInstance.scale opts.scale
        imgInstance.setControlVisible(point, false) for point in ['mt','mr','mb','ml']
        imgInstance.lockRotation = true
        if opts.background then setBackgroundImage imgInstance else canvas.add imgInstance

    cloudinary_fileupload = null
    $(document).ready () ->
      $.cloudinary.config({ cloud_name: 'eeosk' })
      $('.cloudinary').append($.cloudinary.unsigned_upload_tag('800x420', {
        cloud_name: 'eeosk',
        tags: 'browser_uploads'
      }))
      cloudinary_fileupload = $('.cloudinary_fileupload')

    scope.$on 'cloudinary:finished', (e, data) ->
      scope.addImage { url: data, crop: 'limit', w: 800, h: 800, scale: 1, background: true }

    scope.$on 'eeWebColorPicked', (e, color) ->
      switch scope.toolset.type
        when 'rect', 'circle', 'i-text'
          scope.toolset.transparency = 0
          canvas.getActiveObject().setColor color
          canvas.renderAll()
        else canvas.setBackgroundColor(color, renderAll())

    $window.addEventListener 'keydown', (e) ->
      # keyCode: 8, keyIdentifier: "U+0008" (delete)
      # console.log 'document.activeElement', document.activeElement['type']
      if e.keyCode is 8 and document.activeElement['type'] isnt 'text'
        if canvas.getActiveObject() is scope.background then scope.background = null
        scope.removeActiveObject()
        e.preventDefault()

    canvas.on 'object:selected', (options) ->
      canvas.bringToFront options.target
      sortLayers()
      setToolset options.target
      $timeout sa, 100
    canvas.on 'selection:cleared', (options) ->
      sortLayers()
      scope.toolset = {}
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
      scope.unsplash = false


    ### TEXT OPERATIONS ###

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

    scope.$on 'font:set', (e, font) ->
      txt = canvas.getActiveObject()
      if txt
        WebFont.load
          google: families: [font]
          active: () ->
            txt.setFontFamily font
            canvas.renderAll()

    cText = new fabric.IText "Enter text", objectDefaults
      # top: 300
      # left: 20
      # fontStyle: 'italic'
      # fontFamily: 'Varela Round'
      # hasRotatingPoint: false
      # transparentCorners: false
      # cornerColor: '#03A9F4'
      # borderColor: '#03A9F4'
      # cornerSize: 25
      # padding: 20
    cText.setControlVisible(point, false) for point in ['mt','mr','mb','ml']

    ### SHAPE OPERATIONS ###

    rect = new fabric.Rect
      left: 150
      top: 200
      originX: 'left'
      originY: 'top'
      width: 150
      height: 120
      # fill: 'rgba(255,255,100,0.5)'
      fill: '#FFF000'
      hasRotatingPoint: false
      transparentCorners: false
      cornerColor: '#03A9F4'
      borderColor: '#03A9F4'
      cornerSize: 25
      padding: 20

    # removeWhite = () ->
    #   activeObject = canvas.getActiveObject()
    #   return if !activeObject
    #   activeObject.filters = [ new fabric.Image.filters.RemoveWhite({
    #     threshold: scope.toolset.whitespaceThreshold
    #     distance: scope.toolset.whitespaceDistance
    #   })]
    #   activeObject.applyFilters () -> canvas.renderAll()
    #
    # scope.updateWhitespace = () -> $timeout removeWhite, 100
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

    resetToolset()
    canvas.setBackgroundColor '#CC3300', renderAll()
    # scope.addImage({ url: 'https://images.unsplash.com/photo-1422568374078-27d3842ba676?crop=entropy&fit=crop&fm=jpg&h=775&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375', background: true })
    # scope.addImage({ url: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=da5baf2a4cc3516caf930b0fd52a7c37', background: true })
    # scope.addImage({ url: 'https://images.unsplash.com/photo-1445865272827-4894eb9d48de?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=200&fit=max&s=00e11529215615a53bf972851e0cc67d', background: true })
    canvas.add cText
    canvas.add rect

    return
