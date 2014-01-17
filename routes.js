function set_routes(app){
  app.get('/', function(req, res){
   res.render('main',
    { title : 'Home' }
    )
  })
}

exports.set_routes = set_routes
