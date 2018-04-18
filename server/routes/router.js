var router = exports = module.exports = {}
var homeRoute = require('./index')

router.setup = function (app) {
  app.use('/', homeRoute)
}
