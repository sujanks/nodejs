var groupRepository = require('./repository')('groups');

module.exports = function(app, security) {
	app.get('/settings',security.isAuthenticated ,function(req, res) {
		var siteName = req.query["site"];
		var sectionIndex = req.query["index"];
		if(sectionIndex == null) {
			sectionIndex = 0 ;
		}
		console.log('Inside settings controller ' + siteName);
		groupRepository.find({"site":siteName}, function(result) {
			console.log("result: " +result);
			console.log("forwarding to settings/list");
			var msg = "";
			res.render('settings/list',{groups:result, sitename:siteName, index:sectionIndex, msg:msg, user:req.user});
		});
	});
	
	app.get('/settings/groups/edit',security.isAuthenticated,function(req, res) {
		var siteName = req.query["site"];
		var sectionIndex = req.query["index"];
		if(sectionIndex == null) {
			sectionIndex = 0 ;
		}
		console.log('Inside settings controller ' + siteName);
		groupRepository.find({"site":siteName}, function(result) {
			console.log("result: " +result);
			console.log("forwarding to settings/edit");
			res.render('settings/edit',{groups:result, sitename:siteName, index:sectionIndex, user:req.user});
		});
	});
	
	app.post('/settings/groups/update',security.isAuthenticated, function(req, res) {
		var siteName = req.param("site");
		var groupName = req.param("name");
		var groupValues = req.param("groupvalues");
		var index = req.param("index");
		groupRepository.update({"site":siteName, "name":groupName}, {"$set" :{"groupvalues":groupValues}}, {"upsert" : "false"}, function(updateResult) {
			groupRepository.find({"site":siteName}, function(result) {
				console.log("result: " +result);
				console.log("forwarding to settings/list");
				var msg = "";
				if(updateResult > 0) {
					msg = "Update succesfully.";
				} else {
					msg = "Row couldn't be updated. Please check log."
				}
				res.render('settings/list',{groups:result, sitename:siteName, index:index, msg:msg, user:req.user});
			});
		});
		
	});
	
	app.post('/settings/save',security.isAuthenticated, function(req, res) {
		var groupName = req.param("groupName");
		var siteName = req.param("site");
		console.log("Created new site group " +siteName);
		groupRepository.save({"site":siteName, "name":groupName}, function(updateResult){
			groupRepository.find({"site":siteName}, function(result) {
				console.log("result: " +result);
				console.log("forwarding to settings/list");
				var msg = "";
				res.render('settings/list',{groups:result, sitename:siteName, index:0, msg:msg, user:req.user});
			});
		});
		console.log("name : " +groupName);
	});
	
	app.get('/settings/:site', function(req, res) {
		var siteName = req.param("site");
		groupRepository.find({"site":siteName}, function(result) {
			res.json(result);
		});
	});
};