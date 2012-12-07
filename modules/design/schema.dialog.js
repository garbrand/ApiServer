// Dialog Schema

// Flatiron resourceful for data management
// https://github.com/flatiron/resourceful
var resourceful = require('resourceful');

var Dialog = module.exports = resourceful.define('dialog', function() {
	var that = this;
	
	// This is the switch
	// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	switch (process.env.STAGE) {
		case 'DEV':
		case 'STAGE':
		case 'PRODUCTION':
			console.log('Module Design: using CouchDB');
			that.use('couchdb', {
				database: 'apiserver'
			});
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