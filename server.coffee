switch process.env.NODE_ENV
  when 'production'
    require 'newrelic'
  when 'test'
    process.env.PORT = 3333
  else
    process.env.NODE_ENV = 'development'
    process.env.PORT = 3000

express     = require 'express'
vhost       = require 'vhost'
morgan      = require 'morgan'
path        = require 'path'
serveStatic = require 'serve-static'
bodyParser  = require 'body-parser'
compression = require 'compression'

# Parent app
app = express()
app.use compression()

# builder is tool for building storefront
builder = express()

forceSsl = (req, res, next) ->
  if req.headers['x-forwarded-proto'] isnt 'https'
    res.redirect [
      'https://'
      req.get('Host')
      req.url
    ].join('')
  else
    next()
  return

redirectToApex = (req, res, next) ->
  if req.headers.host is 'www.eeosk.com'
    res.writeHead 301,
      Location: [
        'https://eeosk.com'
        req.url
      ].join('')
      Expires: (new Date).toGMTString()

    res.end()
  else
    next()
  return

if process.env.NODE_ENV is 'production'
  # Force SSL and redirect on eeosk properties only
  app.use redirectToApex
  app.use forceSsl
  app.use morgan 'common'
else
  app.use morgan 'dev'

app.use bodyParser.urlencoded({ extended: true })
app.use bodyParser.json()

app.use serveStatic(path.join __dirname, 'dist')
app.all '/*', (req, res, next) ->
  # Send builder.html to support HTML5Mode
  res.sendfile 'builder.html', root: path.join __dirname, 'dist'
  return

# app.use vhost('eeosk.com', builder)
# app.use vhost('www.eeosk.com', builder)
# app.use vhost('demo.eeosk.com', builder)
# app.use vhost('*.ee-front-staging.herokuapp.com', builder)
# app.use vhost('ee-front-staging.herokuapp.com', builder)
#
# app.use vhost('localhost', builder)
# app.use vhost('192.168.1.*', builder)

app.listen process.env.PORT, ->
  console.log 'Frontend listening on port ' + process.env.PORT
  return
