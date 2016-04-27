'use strict'

angular.module('builder.daily').controller 'dailyCtrl', ($state, eeDefiner, eeCollections, eeTracks) ->

  daily = this

  daily.ee    = eeDefiner.exports
  daily.state = $state.current.name

  eeCollections.fns.defineNavCollections()
  eeTracks.fns.getDailyActivity()

  daily.announcement =
    track:
      id: 13
      icon: 'bullhorn'
    activity:
      title: 'eeosk Referral Program'
      steps: [{
        show: true
        title: 'We\'re proud to announce eeosk referrals'
        html: "<p>Now when you refer your friends to eeosk you will earn 5% on products they sell, up to $250 per store that you refer. Your friends will continue to earn their full percentages for each sale they make.<br><br>To get started, visit your referrals page to find and share your unique signup URL: <a href='/referrals' target='_blank'>https://eeosk.com/referrals</a></p>"
      }]
      show: true
      id: 51

  # daily.announcement =
  #   track:
  #     id: 13
  #     icon: 'bullhorn'
  #   activity:
  #     title: 'Free Shipping Over $50'
  #     steps: [{
  #       show: true
  #       title: 'We\'re proud to announce free shipping over $50'
  #       html: "<p>All of your orders over $50 will now have free shipping automatically included. We think your customers will love that, so feel free to let them know.<br><br>Promote this deal to your customers to increase traffic and sales.<br><a href='/live' class='btn btn-success vert-5'>Visit your store</a><br><br>Not sure where to start? Visit your <a href='/tracks/1/facebook' target='_blank'>Marketing Tracks</a> for ideas on how to promote your store.</p>"
  #     }]
  #     show: true
  #     id: 50

  return
