exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: [
  //   'todo-spec.js',
  //   'spec.js',
  //   'spec.coffee'
  // ],
  // capabilities: {
  //   'browserName': 'firefox',
  //   "chromeOptions": {
  //     binary: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
  //     args: [],
  //     extensions: [],
  //   }
  // }
  mochaOpts: {
    ui: 'tdd',
    reporter: "nyan",
    slow: 2000
  },
  onPrepare: function() {
    global.byAttr = global.by;
    browser.driver.manage().window().setPosition(12000,100);
  }
}
