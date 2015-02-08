// Karma configuration
// Generated on Sat Jan 24 2015 15:56:37 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'src/bower_components/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/bower_components/angular-cookies/angular-cookies.min.js',
      'src/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'src/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'src/bower_components/firebase/firebase.js',
      'src/bower_components/angulartics/dist/angulartics.min.js',
      'src/bower_components/angulartics/dist/angulartics-ga.min.js',
      'src/bower_components/angular-marked/angular-marked.js',
      'src/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',

      'src/js/app/app.index.js',
      'src/js/app/core/core.module.js',
      'src/js/app/core/run.js',
      'src/js/app/core/constants.js',
      'src/js/app/core/filters.js',
      'src/js/app/core/config.js',
      'src/js/app/core/ee.back.svc.js',
      'src/js/app/core/ee.auth.svc.js',
      'src/js/app/core/ee.other.svc.js',
      'src/js/app/**/*.module.js',
      'src/js/app/**/*.route.js',
      'src/js/app/**/*.controller.js',
      'src/js/app/**/*.js',
      'src/js/components/**/*.js',

      'src/js/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 3333,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // 'Chrome', 'Firefox', 'Safari'], // 'IE', 'ChromeCanary'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
