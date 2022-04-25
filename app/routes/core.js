module.exports = function (router) {
  // Route index page
  router.get('/', function (req, res) {
    var fakeCases = require('../data/data.js')
    req.session.cases = fakeCases
    req.session.recents = []
    req.session.notifications = {}
    req.session.notifications.list = []

    res.render('index')
  })
  router.all('*', function (req, res, next) {
    if (typeof req.session.cases === 'undefined') {
      return res.redirect('/')
    }
    next()
  })
  // Bookmarks
  router.get('/cases/bookmarks', function (req, res) {
    res.render('cases/bookmarks', {
      cases: req.session.cases
    })
  })
}
