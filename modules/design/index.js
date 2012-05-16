// # Design module

var Design = module.exports = (function() {
	console.log('Adding module: Design');
	
	var Dialog = require('./schema.dialog');
	
	var methods = {
		create: function(title, description, composition) {
			Dialog.create({
				title: title,
				description: description,
				composition: composition
			}, function(error, dialog) {
				if (error) { 
					console.error(error.message);
					return error;
				}
				
				dialog.save(function(error) {
					if (error) { 
						console.error(error.message);
						return error;
					}
					
					console.log('Saved dialog:', dialog);
				});
				
				return dialog;
			});
		}
	};
	
	// Define the routes
	var routes = {
		dialogs: function(request, response) {
			console.log(request, response);
			
			var dialog = methods.create({
				title: request.title,
				description: request.description,
				composition: request.composition
			});
			
			response.serveJSON(request.method);
			// response.serveJSON(dialog);
		}
	};
	
	// Public API
	var api = {
		dialogs: routes.dialogs
	};
	
	return api;
})();