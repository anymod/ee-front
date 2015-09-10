'use strict'

angular.module('builder.landing').controller 'landingCtrl', ($state, eeDefiner, eeAuth, eeModal, eeLanding) ->

  landing = this

  landing.ee = eeDefiner.exports

  landing.show     = eeLanding.show
  landing.data     = eeLanding.data
  landing.fns      = eeLanding.fns
  landing.authFns  = eeAuth.fns
  landing.authExp  = eeAuth.exports
  landing.modalFns = eeModal.fns

  landing.signup = () ->
    eeAuth.fns.createUserFromEmail landing.email, eeDefiner.exports.welcomeProposition
    .then (user) -> $state.go 'go', token: user.go_token
    .catch (err) ->
      if err.message is 'Email format is invalid' then return landing.error = 'That doesn\'t look like a valid email address. Please try again.'
      if err.message is 'Account exists' then return $state.transitionTo 'login', { exists: true }
      landing.error = 'Problem signing up'

  # eeLanding.fns.showState $state.current.name

  if $state.current.name is 'welcome_proposition' then eeDefiner.exports.welcomeProposition = $state.params.proposition
  if $state.current.name is 'foothill'
    if eeAuth.fns.hasToken() then landing.hideSignup = true
    eeDefiner.exports.welcomeProposition = 'foothill'

  return
