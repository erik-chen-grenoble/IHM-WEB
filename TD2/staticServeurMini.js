var RRServer = {
	  express		: require('express')
	, bodyParser	: require("body-parser")
	, multer		: require('multer')
	, app			: null
	, init			: function(port) {
		 var self = this;
		 
		// HTTP server
		 this.app	  = this.express();
		 this.server  = this.app.use( this.express.static(__dirname) )
								.use( this.bodyParser.urlencoded({ extended: false }) )
								.use( this.bodyParser.json() )
								.use( this.multer({ dest: './uploads/'}) )
								.listen(port) ;
		}
};

var params = {}, p;
for(var i=2; i<process.argv.length; i++) {
	p = process.argv[i].split(':');
	params[p[0]] = p[1];
}

var port = params.port || 8080;
console.log("Usage :\n\tnode staticServeur.js [port:PORT]\n\tDefault port is 8080.");
console.log("HTTP server listening on port " + port);
RRServer.init( port );
