// # Design module

var Design = module.exports = (function() {
	console.log('Adding module: Design');
	
	var Dialog = require('./schema.dialog');
	
	// Actions
	var dialogs = {
		create: function(json, callback) {
			Dialog.create(json, function(error, dialog) {
				if (error) { 
					console.error(error.message);
					return error;
				};
				
				dialog.save(function(error) {
					if (error) { 
						console.error('Error:', error);
						return error;
					}
					// callback(error, dialog);
					console.log('Saved dialog:', dialog);
					callback(dialog);
				});
			});
		},
		
		all: function(callback) {
			Dialog.all(function(error, items) {
				callback(items);
			});
		}
	};
	
	
	
	// Define the routes
	var routes = {
		api: function(request, response) {
			console.log(request);
			response.serveJSON(request.method);
			// request.method == GET || POST
			// request.querystring are the parameters as JSON
		},
		// Dialogs
		dialogs: function(request, response) {
			// We can respond to `request.method == GET`
			dialogs.all(function(items) {
				response.serveJSON(items);
			});
		},
		// Populating the DB quickly
		stub: function(request, response) {
			var dialog = dialogs.create({
				title: 'Stub',
				description: 'Creating a stub dialog',
				composition: []
			}, function(item) {
				response.serveJSON(item);
			});
		}
	};

	// Return the routes
	return routes;
})();