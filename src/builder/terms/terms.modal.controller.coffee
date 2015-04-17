'use strict'

angular.module('builder.terms').controller 'termsModalCtrl', ($modalInstance, eeAuth) ->

  this.openPrivacyPolicyModal = () ->
    $modalInstance.close()
    eeAuth.fns.openPrivacyPolicyModal()

  this.openSellerTermsModal = () ->
    $modalInstance.close()
    eeAuth.fns.openSellerTermsModal()

  return
