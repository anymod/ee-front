angular.module 'E.SupplierSignup', []

angular.module('E.SupplierSignup').constant 'eSupplierSignupPath', "/email/supplier/signup"

angular.module('E.SupplierSignup').directive "eSupplierSignup", ($http, eSupplierSignupPath) ->
  templateUrl: 'components/e-supplier-signup/e-supplier-signup.html'
  restrict: 'E'
  scope: {}
  link: (scope) ->
    scope.supplierSignup = (email) ->
      $http.post eSupplierSignupPath, { email: email }
      scope.emailSent = true
      return
    return
