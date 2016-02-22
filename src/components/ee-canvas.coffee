'use strict'

module = angular.module 'ee-canvas', []

module.directive "eeCanvas", ($filter, $window, $timeout) ->
  templateUrl: 'components/ee-canvas.html'
  restrict: 'E'
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.products ||= []
    scope.toolset =
      type: null

    canvas = new fabric.Canvas('c')
    canvas.controlsAboveOverlay = true;
    scope.background = null

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

    setToolset = (target) ->
      if !target then return scope.toolset.type = null
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

    scope.unfocusBackground = () ->
      setAllVisibilityTo true
      if scope.background
        canvas.sendToBack scope.background
        scope.background.selectable = false
      canvas.deactivateAll()
      setToolset null
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

      img = new Image()
      img.setAttribute 'crossOrigin', 'anonymous'
      img.src = $filter('cloudinaryResizeTo')(opts.url,800,420,opts.crop)
      img.onload = () ->
        imgInstance = new fabric.Image img, {
          hasRotatingPoint: false
          transparentCorners: false
          cornerColor: '#03A9F4'
          borderColor: '#03A9F4'
          cornerSize: 25
          padding: 5
        }
        imgInstance.scale opts.scale
        imgInstance.filters = [ new fabric.Image.filters.RemoveWhite({
          threshold: 5
          distance: 5
        })]
        imgInstance.setControlVisible(point, false) for point in ['mt','mr','mb','ml']
        imgInstance.lockRotation = true
        if opts.removeWhite then imgInstance.applyFilters(renderAll())
        if opts.background then setBackgroundImage imgInstance else canvas.add imgInstance

    cloudinary_fileupload = null
    $(document).ready () ->
      $.cloudinary.config({ cloud_name: 'eeosk' })
      $('.cloudinary').append($.cloudinary.unsigned_upload_tag('banner', {
        cloud_name: 'eeosk',
        tags: 'browser_uploads'
      }))
      cloudinary_fileupload = $('.cloudinary_fileupload')

    scope.$on 'cloudinary:finished', (e, data) ->
      scope.addImage { url: data, crop: 'pad', scale: 1, background: true }

    scope.$on 'eeWebColorPicked', (e, data) ->
      console.log data

    $window.addEventListener 'keydown', (e) ->
      # keyCode: 8, keyIdentifier: "U+0008" (delete)
      if e.keyCode is 8 and document.activeElement isnt 'text'
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
      setToolset null
      $timeout sa, 100

    ### IMAGE OPERATIONS ###

    scope.removeActiveObject = () ->
      activeObject = canvas.getActiveObject()
      if activeObject then canvas.remove activeObject

    scope.addRandomImage = () ->
      url = scope.products[Math.floor(Math.random() * scope.products.length)].image
      scope.addImage { url: url }

    scope.updateWhitespace = () ->
      activeObject = canvas.getActiveObject()
      return if !activeObject
      activeObject.filters = [ new fabric.Image.filters.RemoveWhite({
        threshold: scope.toolset.whitespaceStrength
        distance: scope.toolset.whitespaceSize
      })]
      activeObject.applyFilters(renderAll())

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

    cText = new fabric.IText "Enter text",
      top: 300
      left: 20
      fontStyle: 'italic'
      fontFamily: 'Delicious'
      # textAlign: 'right'
      # stroke: '#c3bfbf'
      # strokeWidth: 1
      hasRotatingPoint: false
      transparentCorners: false
      cornerColor: '#03A9F4'
      borderColor: '#03A9F4'
      cornerSize: 25
      padding: 20
    cText.setControlVisible(point, false) for point in ['mt','mr','mb','ml']

    ### SHAPE OPERATIONS ###

    rect = new fabric.Rect
      left: 150
      top: 200
      originX: 'left'
      originY: 'top'
      width: 150
      height: 120
      fill: 'rgba(255,0,0,0.5)'
      hasRotatingPoint: false
      transparentCorners: false
      cornerColor: '#03A9F4'
      borderColor: '#03A9F4'
      cornerSize: 25
      padding: 20

    ### RUNTIME ###

    canvas.setBackgroundColor '#C33', renderAll()
    scope.addImage({ url: 'https://images.unsplash.com/photo-1422568374078-27d3842ba676?crop=entropy&fit=crop&fm=jpg&h=775&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375', background: true })
    canvas.add cText
    canvas.add rect

    return
