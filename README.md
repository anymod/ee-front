ee-front
===

### Installation

`npm install`

`bower install`

### Ports

**ee-front**

*test*        `http://localhost:3333`

*development* `http://localhost:3000`

*production*  `Heroku`


**ee-back**

*test*        `http://localhost:5555`

*development* `http://localhost:5000`

*production*  `Heroku`

### Testing

**Test e2e with NODE_ENV=test**

*ee-front*    `gulp test` runs e2e tests continuously with protractor

*ee-back*     `gulp test` runs api in test environment

**Test api with NODE_ENV=test**

*ee-back*     `gulp watch-mocha` runs api tests continuously with mocha


**Test live site**

*live*        `gulp test-prod` will run e2e tests on live site

### Prod

`gulp prod` to compile app into `/dist`

Visit `http://localhost:5000` to ensure server, `/` and `/product` work

Push to deployment target

### Other

Login at `/login` with username `team@eeosk.com` and password pattern starting with `e`

## Workflow & pricing definition

https://docs.google.com/a/eeosk.com/drawings/d/11vSU7glwutO6zhEx5_f4zXxlCpFQD_LGjVchKy11-J0/edit?usp=sharing
