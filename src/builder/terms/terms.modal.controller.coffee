'use strict'

angular.module('builder.terms').controller 'termsModalCtrl', ($uibModalInstance, eeModal) ->

  this.openPrivacyPolicyModal = () ->
    $uibModalInstance.close()
    eeModal.fns.openPrivacyPolicyModal()

  this.openSellerTermsModal = () ->
    $uibModalInstance.close()
    eeModal.fns.openSellerTermsModal()

  return
