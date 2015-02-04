ee-front
===

### Installation

`npm install`

`bower install`

### Locations

env | ee-front | ee-back
:-----------|:------------------------|:-----------------------
test (e2e)  | `http://localhost:3333` | `http://localhost:5555`
test (api)  | -                       | `http://localhost:5444`
development | `http://localhost:3000` | `http://localhost:5000`
production  | `https://eeosk.com`     | `https://api.eeosk.com`

### Testing

e2e       | env  | runner
:---------|:-----|:-------------
ee-front  | test | `gulp test (--grep=<filter>)` runs web server and e2e tests continuously with protractor
ee-back   | test | `gulp test` runs api server (not tests) in test environment
eeosk.com | production | `gulp test-live` will run e2e tests on live site

api       | env  | runner
:---------|:-----|:-------------
ee-back   | test | `gulp watch-mocha` runs api server and tests continuously with mocha

### Development

dev       | env         | runner
:---------|:------------|:-------------
ee-front  | development | `gulp dev` runs web server in development environment
ee-back   | development | `gulp dev` runs api server in development environment

### Production

prod     | task    | runner
:--------|:--------|:------------
ee-front | compile | `gulp prod` compiles app into `/dist` and runs e2e tests on it with test api server
ee-back  | -       | push directly to target if tests pass


### Other

## Workflow & pricing definition

https://docs.google.com/a/eeosk.com/drawings/d/11vSU7glwutO6zhEx5_f4zXxlCpFQD_LGjVchKy11-J0/edit?usp=sharing
