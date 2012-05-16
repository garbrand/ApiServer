// Dialog Schema

// Flatiron resourceful for data management
// https://github.com/flatiron/resourceful
var resourceful = require('resourceful');

var Dialog = module.exports = resourceful.define('dialog', function() {
	var that = this;
	
	switch (process.env.STAGE) {
		case 'DEV':
		case 'STAGE':
		case 'PRODUCTION':
			console.log('Module Design: using CouchDB');
			that.use('couchdb');
			break;
		default:
			console.log('Module Design: using Memory Persistance');
			that.use('memory');
	}

	// Schema
	this.string('title');
	this.string('description');
	this.array('composition');
});