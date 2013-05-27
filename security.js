var LocalStrategy = require('passport-local').Strategy,
	userRepository = require('./routes/repository')('users');

var securityOptions = {
	loginUrl: '/login',
	logoutUrl: '/logout'
};

var ensureAuthenticated = function(req, res, next) {
	console.log("Checking login");
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect(securityOptions.loginUrl);
};

var init = function(passport, app, options) {
	console.log("Security init called");
	options = options || securityOptions;
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	
	passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
	
	passport.use(new LocalStrategy(
		function(username, password, done){
			process.nextTick(function(){
				console.log("username "+username+ "password " +password);
				userRepository.find({"username":username, "password":password}, function(user){
				if(user.length<1) {
					return done(null, false, { message: 'Unknown user ' + username }); 
				}
				return done(null,user);
			});			
		});
	}));
};

module.exports = {
	initialize : function(passport, app) {
		init(passport, app, securityOptions);
	},
	isAuthenticated: ensureAuthenticated
};