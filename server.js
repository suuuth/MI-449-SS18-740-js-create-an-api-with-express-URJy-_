var todo = require('./todo.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})
app.get('/todo', function (request, response) {
  response.json(todo)
})
app.get('/todo/:id', function (request, response) {
  if (!todo[request.params.id]) {
    response.status(404).end('sorry, no such task: ' + request.params.id)
    return
  }
  response.json(todo[request.params.id])
})
app.post('/todo', function (request, response) {
  var id = request.body.name.trim().toLowerCase().split(' ').join('-')
  // todo[id] = request.body
  todo[id] = {
    name: request.body.name.trim(),
    time_minutes: '' + parseFloat(request.body.time_minutes)
  }
  response.redirect('/todo/' + id)
})
app.delete('/todo/:id', function (request, response) {
  delete todo[request.params.id]
  response.redirect('/todo')
})
app.put('/todo/:id', function (request, response) {
  var product = todo[request.params.id]
  if (request.body.name !== undefined) {
    product.name = request.body.name.trim()
  }
  if (request.body.time_minutes !== undefined) {
    product.time_minutes = '' + parseFloat(request.body.time_minutes)
  }
  response.redirect('/todo/' + request.params.id)
})
app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)