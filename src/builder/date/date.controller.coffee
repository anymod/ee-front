'use strict'

angular.module('app.core').controller 'dateCtrl', ($rootScope, $stateParams, $scope, eeDefiner) ->

  date = this

  date.ee   = eeDefiner.exports
  date.date =
    year:   parseInt($stateParams.year)
    month:  parseInt($stateParams.month) - 1
    day:    if $stateParams.day then parseInt($stateParams.day) else null

  today = new Date()
  if !$stateParams.year or !$stateParams.month
    today = new Date()
    date.date.year  = today.getFullYear()
    date.date.month = today.getMonth()
    date.date.day   = today.getDate()

  date.isToday = (date.date.year is today.getFullYear() and date.date.month is today.getMonth() and date.date.day is today.getDate())

  date.calendarMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  $scope.$on '$stateChangeSuccess', () ->
    if date.ee?.User?.user?.username
      createCharts date.ee.User.user, date.date
    else
      $scope.$on 'user:set', () -> createCharts date.ee.User.user, date.date

  keenioTimeframe = (endYear, endMonth, endDay, numDays) ->
    if !endDay # use entire month
      endDate = new Date(endYear, endMonth + 1, 0)
      startDate = new Date(endYear, endMonth, 0)
    else
      endDate = new Date(Date.parse('' + endYear + '-' + (endMonth + 1) + '-' + endDay))
      startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - numDays))
    suffix = 'T00:00:00.000-05:00'
    endTimeframe   = '' + [endDate.getFullYear(), ('0' + (endDate.getMonth() + 1)).substr(-2,2), ('0' + endDate.getDate()).substr(-2,2)].join('-') + suffix
    startTimeframe = '' + [startDate.getFullYear(), ('0' + (startDate.getMonth() + 1)).substr(-2,2), ('0' + startDate.getDate()).substr(-2,2)].join('-') + suffix
    [startTimeframe, endTimeframe]

  keenioTimeReadable = (t) ->
    if !t then return
    [y,m,d] = t.split('T')[0].split('-')
    date.calendarMonths[parseInt(m) - 1] + ' ' + d + ', ' + y

  colorMapping =
    Facebook:   '#3b5998'
    Pinterest:  '#cc2127'
    Twitter:    '#55acee'
    Instagram:  '#3f729b'
    Google:     '#4285F4'
    You:        '#CCCCCC'
    'Customer views': '#0286c2'

  stackedChartOptions =
    isStacked: true
    legend: position: 'none'
    height: 200
    chartArea:
      width: '100%'
      height: '100%'
    titlePosition: 'in'
    axisTitlesPosition: 'in'
    hAxis:
      gridlines:
        color: 'transparent'
        count: 8
    vAxis:
      textPosition: 'in'
      maxValue: 6

  createCharts = (u, d) ->

    baseFilters = [{
      operator: 'eq',
      property_name: 'user',
      property_value: u.tr_uuid
    }]
    tableFilters    = angular.copy baseFilters
    refererFilters  = angular.copy baseFilters

    for prop in ['eeosk', 'localhost', 'herokuapp']
      refererFilters.push {
        operator: 'not_contains',
        property_name: 'refererDomain',
        property_value: prop
      }
    for prop in ['username', 'domain']
      if date.ee.User.user[prop] then refererFilters.push {
        operator: 'not_contains',
        property_name: 'refererDomain',
        property_value: u[prop]
      }

    Keen.ready () ->
      dayTimeframe = keenioTimeframe date.date.year, date.date.month, date.date.day, 1

      # Visits
      dailyVisits = new Keen.Query 'count', {
        eventCollection: 'store'
        filters: baseFilters
        groupBy: ['path']
        timeframe:
          start: dayTimeframe[0]
          end: dayTimeframe[1]
        timezone: 'US/Eastern'
      }
      date.dailyVisits = null
      $rootScope.keenio.run dailyVisits, (err, res) ->
        for view in res.result
          if view.path
            if view.path is '/'
              view.type = 'Home page'
            else
              last = view.path.split('/')[view.path.split('/').length - 1]
              view.title = last
              if view.path.indexOf('/collections/') is 0 then view.type = 'Collection'
              else if view.path.indexOf('/categories/') is 0 then view.type = 'Category'
              else if view.path.indexOf('/products/') is 0 then view.type = 'Product'
              else if view.path is '/about' then view.type = 'About'
              else if view.path is '/search' then view.type = 'Search'
              else if view.path is '/help' then view.type = 'Help'
              else if view.path is '/cart' then view.type = 'Cart'
        date.dailyVisits = res.result
        $scope.$apply()

      # Referers
      dailyReferers = new Keen.Query 'count', {
        eventCollection: 'store'
        filters: refererFilters
        groupBy: ['refererDomain']
        timeframe:
          start: dayTimeframe[0]
          end: dayTimeframe[1]
        timezone: 'US/Eastern'
      }
      date.dailyReferers = null
      $rootScope.keenio.run dailyReferers, (err, res) ->
        date.dailyReferers = res.result
        $scope.$apply()


      # Monthly view
      if !date.date.day

        monthTimeframe = keenioTimeframe date.date.year, date.date.month, null, 31

        # Views
        monthlyViews = new Keen.Query 'count', {
          eventCollection: 'store'
          filters: baseFilters
          groupBy: ['self']
          interval: 'daily'
          timeframe:
            start: monthTimeframe[0]
            end: monthTimeframe[1]
          timezone: 'US/Eastern'
        }
        monthlyViewsChart = new Keen.Dataviz()
          .el(document.getElementById('stacked_views'))
          .chartType 'columnchart'
          .title 'Store views'
          .colorMapping colorMapping
          .chartOptions stackedChartOptions
          .prepare()
        $rootScope.keenio.run monthlyViews, (err, res) ->
          if err then return monthlyViewsChart.error(err.message)
          for entry in res.result
            if entry.timeframe?.end
              entry.timeframe.end   = keenioTimeReadable entry.timeframe.end
              entry.timeframe.start = keenioTimeReadable entry.timeframe.end
            for arr in entry.value
              arr.self = if arr.self then 'You' else 'Customer views'
          monthlyViewsChart.parseRawData({ result: res.result }).render()

        # Referers
        monthlyReferers = new Keen.Query 'count', {
          eventCollection: 'store'
          filters: refererFilters
          groupBy: ['refererDomain']
          interval: 'daily'
          timeframe:
            start: monthTimeframe[0]
            end: monthTimeframe[1]
          timezone: 'US/Eastern'
        }
        monthlyReferersChart = new Keen.Dataviz()
          .el(document.getElementById('stacked_visits'))
          .chartType 'columnchart'
          .title 'Visits from other sites'
          .colorMapping colorMapping
          .chartOptions stackedChartOptions
          .prepare()
        $rootScope.keenio.run monthlyReferers, (err, res) ->
          console.log err, res
          if err then return monthlyReferersChart.error(err.message)
          for entry in res.result
            if entry.timeframe?.end
              entry.timeframe.end   = keenioTimeReadable entry.timeframe.end
              entry.timeframe.start = keenioTimeReadable entry.timeframe.end
          monthlyReferersChart.parseRawData({ result: res.result }).render()

  return
