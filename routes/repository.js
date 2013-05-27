var dbManager = require('./entitymgr').db(),
	BSON = require('mongodb').BSONPure;;

function Repository(colname) {
    this.colname = colname;
};

module.exports = function (col) {
    return new Repository(col);
};


Repository.prototype.find = function(options, handler) {
	options = options || {};
	var result = {};
	var colname = this.colname;
	dbManager.open(function(err, db) {
		if(err) {
			return handler(err);
		}
		var collection = db.collection(colname);
		collection.find(options).toArray(function(err, items){
			db.close();
			if(err) {
				return handler(result);
			} else {
				handler(items);
			}
		});
	});
};

Repository.prototype.findOne = function(options, handler) {
	options = options || {};
	var result = {};
	var colname = this.colname;
	dbManager.open(function(err, db) {
		if(err) {
			return handler(err);
		}
		var collection = db.collection(colname);
		collection.findOne(options, function(err, data) {
			db.close();
			if(err) {
				return handler(err);
			} else {
				console.log("Data "+data)
				handler(data);
			}
		});
	});
};

Repository.prototype.findById = function(id, handler) {
	console.log("Retrieving Site id " + id);
	var result = {};
	var colname = this.colname;
	dbManager.open(function(err, db) {
		if(err) {
			return handler(err);
		}
		var collection = db.collection(colname);
		collection.findOne({'_id':new BSON.ObjectID.createFromHexString(id)}, function(err, data) {
			db.close();
			if(err) {
				return handler(err);
			} else {
				console.log("Data "+data)
				handler(data);
			}
		});
	});
};

Repository.prototype.update = function(query, update, upsert, handler) {
	upsert = upsert || {};
	var colname = this.colname;
	dbManager.open(function(err, db) {
		if(err) {
			return handler(err);
		}
		var collection = db.collection(colname);
		collection.update(query, update, upsert, function(err, result){
			db.close();
			if(err) {
				console.log("Error updating group " +err);
				return handler(err);
			} else {
				console.log("Update successfully "+result);
				handler(result);
			}
		});
	});
};

Repository.prototype.save = function(query, handler) {
	var colname = this.colname;
	dbManager.open(function(err, db) {
		if(err) {
			return handler(err);
		}
		var collection = db.collection(colname);
		collection.insert(query, {safe:true}, function(err, result){
			db.close();
			if(err) {
				console.log("Error updating group " +err);
				return handler(err);
			} else {
				console.log("Inserted successfully "+result);
				handler(result);
			}
		});
	});
};
