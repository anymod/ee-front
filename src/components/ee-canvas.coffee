'use strict'

module = angular.module 'ee-canvas', []

module.directive "eeCanvas", ($filter, $window) ->
  templateUrl: 'components/ee-canvas.html'
  restrict: 'E'
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.products ||= []

    canvas = new fabric.Canvas('c')
    canvas.setBackgroundColor('#C33', canvas.renderAll.bind(canvas));
    canvas.controlsAboveOverlay = true;

    rect = new fabric.Rect
      left: 150
      top: 200
      originX: 'left'
      originY: 'top'
      width: 150
      height: 120
      fill: 'rgba(255,0,0,0.5)'
      transparentCorners: false

    comicSansText = new fabric.Text "I'm some text",
      top: 400
      left: 50
      fontStyle: 'italic'
      fontFamily: 'Delicious'
      textAlign: 'right'
      # stroke: '#c3bfbf'
      # strokeWidth: 1

    scope.$on 'cloudinary:finished', (e, data) ->
      scope.addImage { url: data, crop: 'pad', scale: 1 }

    cloudinary_fileupload = null
    $(document).ready () ->
      $.cloudinary.config({ cloud_name: 'eeosk' })
      $('.cloudinary').append($.cloudinary.unsigned_upload_tag('banner', {
        cloud_name: 'eeosk',
        tags: 'browser_uploads'
      }))
      cloudinary_fileupload = $('.cloudinary_fileupload')


      # $('.cloudinary-button').on 'click', () ->
      #   canvas.discardActiveObject()
      #   data = canvas.toDataURL('jpg')
      #   $('.cloudinary_fileupload').fileupload('option', 'formData').file = data;
      #   $('.cloudinary_fileupload').fileupload('add', { files: [ data ] })
      #   delete($('.cloudinary_fileupload').fileupload('option', 'formData').file);

    scope.upload = () ->
      canvas.discardActiveObject()
      data = canvas.toDataURL 'jpg'
      cloudinary_fileupload.fileupload('option', 'formData').file = data
      cloudinary_fileupload.fileupload 'add', { files: [ data ] }
      delete cloudinary_fileupload.fileupload('option', 'formData').file

    scope.addImage = (opts) ->
      opts        ||= {}
      opts.url    ||= scope.products[Math.floor(Math.random() * scope.products.length)].image
      opts.crop   ||= 'fit'
      opts.scale  ||= 0.5

      img = new Image()
      img.setAttribute 'crossOrigin', 'anonymous'
      img.src = $filter('cloudinaryResizeTo')(opts.url,800,470,opts.crop)
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
        if opts.removeWhite then imgInstance.applyFilters(canvas.renderAll.bind(canvas))
        canvas.add imgInstance


    scope.addImage({ url: 'https://images.unsplash.com/photo-1422568374078-27d3842ba676?crop=entropy&fit=crop&fm=jpg&h=775&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375' })

    scope.removeActiveImage = () ->
      activeObject = canvas.getActiveObject()
      if activeObject then canvas.remove activeObject

    $window.addEventListener 'keydown', (e) ->
      # keyCode: 8, keyIdentifier: "U+0008"
      if e.keyCode is 8 and document.activeElement isnt 'text'
        scope.removeActiveImage()
        e.preventDefault()

    return
