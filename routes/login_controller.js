
module.exports = function(app) {
	app.get('/login', function(req, res) {
		console.log('Forward request to login');
		res.render('login',{user:req.user, message:req.flash('error')});
	});
  	
  	app.get('/logout', function(req, res){
  		req.logout();
  		res.redirect('/');
  	});
};