var mongo = require('mongodb');

var Db = mongo.Db,
	Server = mongo.Server,
	Connection = mongo.Connection;

var config = {"hostname":"localhost", "port":27017, "db":"ppdb", "username":"", "password":""};

var serverOptions = {
    'auto_reconnect':true,
    'poolSize': 4,
    'username': config.username,
    'password': config.password
};

var dbOptions = {
	'w':1,
	'j':false,
	'fsync':false
};

var dbServer = new Server(config.hostname, config.port, serverOptions);

module.exports.db = function() {
	return new Db(config.db, dbServer, dbOptions);	
}; 
