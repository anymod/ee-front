angular.module 'E.ProductEditor', []

angular.module('E.ProductEditor').directive "eProductEditor", ->
  templateUrl: 'components/e-product-editor/e-product-editor.html'
  restrict: 'E'
  scope:
    product: '='
    createProduct: '&'
    updateProduct: '&'
    deleteProduct: '&'
  controller: ($scope) ->
    $scope.conditions = [
      "New"
      "Used - Like New"
      "Used - Very Good"
      "Used - Acceptable"
      "Used - Good"
      "Refurbished"
    ]

    $scope.conditions = [
      "New"
      "Used - Like New"
      "Used - Very Good"
      "Used - Acceptable"
      "Used - Good"
      "Refurbished"
    ]

    $scope.categories = [
      "Apparel"
      "Shoes & Accessories"
      "Home & Garden"
      "Everything Else"
    ]

    # define constant product properties when creating new product
    if !$scope.product
      $scope.product =
        'trade': true
        'condition': "New"
        'quantity': 1
        'freeShipping': true

    # product obj that goes into firebase
    $scope.inputFields = [
      { name: 'title',         type: 'text',     required: true }
      { name: 'description',   type: 'textarea', required: true, placeholder: "supports markdown" }
      { name: 'images',        type: 'text',     required: true, placeholder: "comma separated w/o quotes, e.g. '1.jpg, 2.jpg'" }
      { name: 'brand',         type: 'text'      }
      { name: 'condition',     type: 'select',   required: true }
      { name: 'trade',         type: 'checkbox'  }
      { name: 'lister',        type: 'text',     required: true, placeholder: "that's you!" }
      { name: 'listerPrice',   type: 'number',   step: .01, min: 0 }
      { name: 'baselinePrice', type: 'number',   required: true, step: .01, min: 0 }
      { name: 'shippingPrice', type: 'number',   step: .01, min: 0 }
      { name: 'freeShipping',  type: 'checkbox', required: true }
      { name: 'quantity',      type: 'number',   required: true, step: 1, min: 0 }
      { name: 'category',      type: 'select',   required: true }
      { name: 'tags',          type: 'text',     placeholder: "<= 5; comma separated w/o quotes; e.g. 'pet, book'" }
      { name: 'url',           type: 'url',      placeholder: "url to manufacture's page" }
    ]

    # not part of product obj that goes into firebase
    $scope.inputFieldsAdditional = [
      { name: 'image_gen',     type: 'text',      placeholder: "e.g.: 'product-image, 5'" }
    ]

    $scope.imageGen = (input) ->
      if input.length is 2 and input[1].length <= 2
        $scope.product.images = []
        [1..input[1]].forEach (i) ->
          $scope.product.images.push "#{input[0]}-#{i}.jpg"
          return
      return

    return
  link: (scope, ele, attr) ->
    scope.type = attr.type
    return
