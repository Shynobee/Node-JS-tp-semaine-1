var express = require('express');
var formidable = require('formidable');

var app = express();
app.use(express.static(__dirname));

// GET: Affiche le fichier index.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// POST: prend en charge la data client 
app.post('./ressources/', function(req, res) {
	var form = new formidable.IncomingForm();
	var index, filename;

	form.parse(req);

	form.on('field', function(name, value) {
		if (name == 'index') index = value;
	});

	form.on('fileBegin', function(name, file) {
		file.path = __dirname + './ressources/' + file.name;
	});
	
	form.on('file', function(name, file) {
		filename = file.name;
	});

	form.on('end', function() {
		res.json({
			index: index,
			filename: filename
		});
	});

	form.on('error', function () {
		res.end('CAAAAA MAARRRCCCHHHHEEE PAAAAAASSSSSSS !!!!');
	});
});

// Run server
app.listen(3000, function () {
	console.log("Server au http://localhost:3000.");
});