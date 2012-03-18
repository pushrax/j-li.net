var fs = require('fs');

module.exports = function(app) {
	/*fs.readdirSync(__dirname).forEach(function(file) {
		if (file == "index.js") return;
		
		require('./' + file.substr(0, file.indexOf('.')))(app);
	});*/

	function renderPage(req, res, view, title) {
		var menuItems = [
			{ name: 'projects', path: '/projects', ajax: true },
			{ name: 'music', path: '/music', ajax: true },
			{ name: 'resume', path: '/resume', ajax: false },
			{ name: 'contact', path: '/contact', ajax: true }
		];
		
		var ajaxRequest = (typeof req.query['ajax'] !== "undefined");
		if (req.xhr || ajaxRequest) {
			res.partial(view, { title: title, view: view, menuItems: menuItems }, function(err, str) {
				res.json({title: title, view: view, html: str});
			});
		} else {
			res.render(view, { title: title, view: view, menuItems: menuItems });
		}
	}
	
	app.get('/', function(req, res) {
		renderPage(req, res, 'index', '');
	});

	app.get('/projects', function(req, res) {
		renderPage(req, res, 'projects', 'Projects');
	});

	app.get('/contact', function(req, res) {
		renderPage(req, res, 'contact', 'Contact');
	});

	app.get('/music', function(req, res) {
		renderPage(req, res, 'music', 'Music');
	});
};
