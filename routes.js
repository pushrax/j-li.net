var fs = require('fs');

module.exports = function(app){
	/*fs.readdirSync(__dirname).forEach(function(file) {
		if (file == "index.js") return;
		
		require('./' + file.substr(0, file.indexOf('.')))(app);
	});*/
	
	app.get('/', function(req, res){
		res.render('index', { title: '' });
	});

	app.get('/projects', function(req, res) {
		res.render('projects', { title: 'Projects' });
	});

	app.get('/contact', function(req, res) {
		res.render('contact', { title: 'Contact' });
	});
};
