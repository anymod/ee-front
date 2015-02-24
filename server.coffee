switch process.env.NODE_ENV
  when 'production'
    require 'newrelic'
    stripeSecretKey = 'sk_live_UNVB2zgYAXxv90X9vuQckxc6'
  when 'test'
    process.env.PORT = 3333
    stripeSecretKey = 'sk_test_1luLv9PtbgsqWX5irh1KLgdu'
  else
    process.env.NODE_ENV = 'development'
    process.env.PORT = 3000
    stripeSecretKey = 'sk_test_1luLv9PtbgsqWX5irh1KLgdu'

express         = require 'express'
vhost           = require 'vhost'
morgan          = require 'morgan'
path            = require 'path'
serveStatic     = require 'serve-static'
Firebase        = require 'firebase'
eFirebaseRef    = new Firebase 'https://fiery-inferno-1584.firebaseIO.com/'
bodyParser      = require 'body-parser'
stripe          = require('stripe')(stripeSecretKey)

# Parent app
app             = express()

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
  app.use redirectToApex
  app.use forceSsl
  app.use morgan 'common'
else
  app.use morgan 'dev'

app.use bodyParser.urlencoded({ extended: true })
app.use bodyParser.json()

# app.use '/product/*.html', express.static path.join __dirname, 'views'
#
# app.get '/product/:id?', (req, res) ->
#   getProduct req.params.id, (link, product) ->
#     if link and product
#       product.baselinePrice = undefined
#       product.url = undefined
#       res.render 'index.ejs',
#         path: req.params.id
#         stripeKey: stripeKey
#         link: link
#         product: product
#         env: process.env.NODE_ENV || 'development'
#     else
#       res.writeHead 301,
#         Location: 'https://eeosk.com'
#         Expires: (new Date).toGMTString()
#
#       res.end()
#     return
#   return
#
# app.use '/product', express.static path.join __dirname, 'dist/product'
#
# app.post '/email/supplier/signup', (req, res) ->
#   supplierEmail = req.body.email
#   note = 'I want to be a supplier: ' + supplierEmail
#   sendEmail 'team@eeosk.com', note, note
#   res.end()
#
# app.post '/stripe/charges/create', (req, res) ->
#   { stripeToken, amount, product, link, address } = req.body
#   stripe.charges.create
#     amount: amount
#     currency: 'usd'
#     card: stripeToken.id
#     receipt_email: stripeToken.email
#     statement_description: product.title.substring(0, 15)
#     metadata:
#       email: stripeToken.email
#       amount: amount
#       link: JSON.stringify link
#   , (err, charge) ->
#     if err
#       res.status(402).send err
#     else
#       res.status(200).send 'OK'

# builder is tool for building storefront; store is actual storefront
builder         = express()
store           = express()

builder.use serveStatic(path.join __dirname, 'dist')
builder.all '/*', (req, res, next) ->
  console.log 'looking!'
  # Send dist/index.html or dist_store/index.html to support HTML5Mode
  res.sendfile 'index.html', root: path.join __dirname, 'dist'
  return

store.use serveStatic(path.join __dirname, 'dist/store')
store.all '/*', (req, res, next) ->
  console.log 'storefront!'
  # Send dist/index.html or dist_store/index.html to support HTML5Mode
  res.sendfile 'index.html', root: path.join __dirname, 'dist'
  return

app.use vhost('eeosk.com', builder)
app.use vhost('demo.eeosk.com', builder)
app.use vhost('*.eeosk.com', store)

app.use vhost('localhost', builder)
app.use vhost('*.localhost', store)

app.listen process.env.PORT, ->
  console.log 'Frontend listening on port ' + process.env.PORT
  return
