var Hapi = require('hapi');
var Path = require('path');
var Routes = require('./routes');
var Config = require('./config');
// var User = require('./models/user').User;
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";
// Create a server with a host and port
var server = new Hapi.Server();
var engine = require('hapi-react')();
server.connection({ port: Config.server.port });
server.register(require('vision'), function (err) {

    if (err) {
        console.log("Failed to load vision.");
    }
});
// Register the plugin
server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'worldofwalmart', // cookie secret
        cookie: 'session', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
});

var options = { beautify: true };
 
server.views({
  engines: {
    jsx: require('hapi-react')(options)
  }
});

var Inert = require('inert');
var port = process.env.PORT || 1000;
server.register(Inert, function () {});
// Add main app route





server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'assets'
    }
  }
});




server.route(Routes.endpoints);

// Start the server
server.start(function() {
    console.log("The server has started on port: " + server.info.port);
});