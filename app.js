var express = require('express')
  , router = require('./routes')
var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))

router.set_routes(app)

app.listen(8888)
console.log("Server running on http://localhost:8888");
