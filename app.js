var express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

var routes = require("./routes.js")(app);

var server = app.listen(3000, function(){
	console.log("Listening on port %s...", server.address().port);
});

