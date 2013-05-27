var siteRepository = require('./repository')('sites');

module.exports = function (app, security) {
	app.get('/sites', security.isAuthenticated, function(req, res) {
		siteRepository.find({}, function(result) {
			res.render('sites/list', {sites : result, user:req.user});
		});
	});
};