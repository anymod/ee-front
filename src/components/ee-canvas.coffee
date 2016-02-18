'use strict'

module = angular.module 'ee-canvas', []

module.directive "eeCanvas", ($filter) ->
  templateUrl: 'components/ee-canvas.html'
  restrict: 'E'
  scope:
    products: '='
  link: (scope, ele, attrs) ->
    scope.products ||= []

    canvas = new fabric.Canvas('c')
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

    scope.addImage = () ->
      img = new Image()
      img.setAttribute 'crossOrigin', 'anonymous'
      img.src = scope.products[Math.floor(Math.random() * scope.products.length)].image
      img.src = $filter('cloudinaryResizeTo')(img.src,800,470,'fit')
      console.log img.src
      img.onload = () ->
        imgInstance = new fabric.Image img, {
          hasRotatingPoint: false
          transparentCorners: false
          cornerColor: '#03A9F4'
          borderColor: '#03A9F4'
          cornerSize: 15
          padding: 5
          removeWhite: true
        }
        imgInstance.scale 0.5
        imgInstance.filters = [ new fabric.Image.filters.RemoveWhite({
          threshold: 5
          distance: 5
        })]
        imgInstance.setControlVisible(point, false) for point in ['mt','mr','mb','ml']
        imgInstance.applyFilters(canvas.renderAll.bind(canvas))
        canvas.add imgInstance

    return
