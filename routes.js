
var appRouter = function(app) {

	var mysql = require("mysql");
	var con = mysql.createConnection({
		host: "45.55.29.227",
		user: "foodtrack",
		password: "WbN9zhCdQng2xd",
		database:"foodtrack"
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to the database');
			return;
		}
		console.log('Connection established');
	});

	app.post("/diet", function(req, res) {

		var item = req.body.name;
		//var entry = { name: item};
		con.query(' INSERT INTO diet_items (name) values(?)', item, function(err, res){
		if(err)
			throw err;
		res.sendStatus(200);

		});    	
		//con.close();
	});


	app.get("/diet", function(req, res) {
		//get all items
		con.query('Select * from diet_items', function(err, res){
			if(err)
				throw err;
			res.send(JSON.stringify(res));
		});

		//con.close();
		
	});

	app.get("/diet/:id", function(req, res) {

		var id = req.params.id;
		con.query('SELECT * FROM diet_items WHERE id = ?', id, function(err, result){
			if(err)
				throw err;
			if(result.length === 0){
				res.send(JSON.stringify(null));
			}
			else
				res.send(JSON.stringify(result[0]));
		})
	});

	app.get("/diet/:id/history", function(req, res){

		var id = req.params.id;
		con.query('SELECT * FROM history WHERE diet_item_id = ?', id, function(err, result){
			if(err)
				throw err;
			res.send(JSON.stringify(result));
		});

	});

	app.post("/diet/:id/history", function(req, res){

	//updating history

		var id = req.params.id;
		var date = req.body.date;

		con.query('INSERT INTO history (diet_item_id, date) values(?,FROM_UNIXTIME(?))',
			[id, date],
			function(err, result) {
				if(err)
					throw err;
				res.send(JSON.stringify("success"));
			}
		);
	});

	app.delete("/diet/:id/history", function(req,res){

		var id = req.params.id;
		var date = req.body.date;

		con.query('DELETE FROM history WHERE diet_item_id = ? AND CAST(FROM_UNIXTIME(?) AS DATE) = CAST(date AS DATE)',[id, date], function(err, result){
			if(err)
				throw err;
			if(result.affectedRows.length === 0)
				res.sendStatus(404);
			res.sendStatus(204);
		});

	})

}	
module.exports = appRouter;