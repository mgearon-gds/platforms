const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./routes/core.js')(router)
require('./routes/all.js')(router)
require('./routes/forms.js')(router)

// Word page on get

router.get('/application/overview', function (req, res) {
  res.render('application/overview', {
    // To use the company data on that page use the following
    home: "home"
  })
})
router.get('/word', function (req, res) {
  var word = req.query.word
  res.render('word', {
    // To use the company data on that page use the following
    word: word
  })
})

router.get('/payment', function (req, res) {
  var word = req.query.word
  res.render('payment', {
    // To use the company data on that page use the following
    word: word
  })
})

router.get('/log', function (req, res) {
  var word = req.query.word
  res.render('log', {
    // To use the company data on that page use the following
    word: word
  })
})

// Delete word page on get
router.get('/delete-word', function (req, res) {
  var word = req.query.word
  res.render('delete-word', {
    // To use the company data on that page use the following
    word: word
  })
})

// Add new word on post
router.post('/add-new-word', function (req, res) {
  var errors = []
  var wordHasError = false
  var superrestrictedHasError = false
  // Check to see if the input for the new word is blank
  if (req.session.data['new-word'] === '') {
    wordHasError = true
    errors.push({
      text: 'Enter a word',
      href: '#new-word'
    })
  }
  // Check to see if the radio options are blank
  if (typeof req.session.data['super-restricted-word'] === 'undefined') {
    superrestrictedHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#super-restricted-word'
    })
  }
  // If either have an error then return the page with the errors
  if (wordHasError || superrestrictedHasError) {
    res.render('add-new-word', {
      errorWord: wordHasError,
      errorSuperrestricted: superrestrictedHasError,
      errorList: errors
    })
  // If no errors then do this
  } else {
    req.session.wordAdded = req.body.newWord
    res.redirect('all?status=success')
  }
})

module.exports = router
