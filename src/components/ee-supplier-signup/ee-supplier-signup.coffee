angular.module 'EE.SupplierSignup', []

angular.module('EE.SupplierSignup').constant 'eeSupplierSignupPath', "/email/supplier/signup"

angular.module('EE.SupplierSignup').directive "eeSupplierSignup", ($http, eSupplierSignupPath) ->
  templateUrl: 'components/ee-supplier-signup/ee-supplier-signup.html'
  restrict: 'E'
  scope: {}
  link: (scope) ->
    scope.supplierSignup = (email) ->
      $http.post eeSupplierSignupPath, { email: email }
      scope.emailSent = true
      return
    return
