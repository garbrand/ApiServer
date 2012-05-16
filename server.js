var ApiServer = require('apiserver')
  , http = 		require('http');

// Setup the server
// http://kilianc.github.com/node-apiserver/
var apiserver = new ApiServer({
	port: process.env.PORT || 8080,
	server: http.createServer(),
	standardHeaders: {
		'cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
		'expires': 0,
		'pragma': 'no-cache',
		'x-server': 'ApiServer v' + ApiServer.version + ' raging on nodejs ' + process.version
	},
	timeout: 2000
});


// Add the modules
apiserver.addModule('v1', 'design', require('./modules/design'));


// Fire up the server
apiserver.listen( function(error) { 
	if (error) {
		console.error('ApiServer not started: %s', error.message);
	} else {
		console.log('ApiServer bound to port: %s', apiserver.port);
	}
});

