'use strict'

angular.module('builder.settings').controller 'settingsCtrl', (eeDefiner) ->

  settings = this

  settings.ee = eeDefiner.exports

  settings.discounts = [
    { amount: 5,  code: 'A5V675X' }
    { amount: 10, code: '' }
    { amount: 15, code: '' }
    { amount: 20, code: '' }
    { amount: 25, code: '' }
    { amount: 30, code: '' }
    { amount: 33, code: '' }
    { amount: 35, code: '' }
    { amount: 40, code: '' }
    { amount: 45, code: '' }
    { amount: 50, code: '' }
  ]

  settings.margins = []
  settings.margins.push discount.amount for discount in settings.discounts
  settings.setMargin = (margin) -> settings.activeMargin = margin
  settings.setMargin 15

  letters = "ACDEGHJKLMNPQRSTUWXYZ"
  randomLetter = () -> letters.charAt(Math.floor(Math.random() * letters.length))
  randomNumber = () -> parseInt(Math.random() * 9) + 1

  for discount in settings.discounts
    discount.code = randomLetter() + discount.amount + randomLetter() + randomNumber() + randomNumber() + randomLetter()
    if discount.amount < 10 then discount.code += randomLetter()

  return
