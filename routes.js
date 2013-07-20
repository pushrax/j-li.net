var fs = require('fs');

module.exports = function(app) {
  function renderPage(req, res, view, data) {
    var title = view;
    if (view == 'index') title = '';

    var ajaxRequest = (typeof req.query['ajax'] !== "undefined");
    if (req.xhr || ajaxRequest) {
      res.render(view, { title: title, view: view, data: data, partial: true }, function(err, str) {
        res.json({title: title, view: view, html: str});
      });
    } else {
      res.render(view, { title: title, view: view, data: data, partial: false });
    }
  }

  app.get('/', function(req, res) {
    renderPage(req, res, 'index');
  });

  app.get('/projects', function(req, res) {
    renderPage(req, res, 'projects');
  });

  app.get('/music', function(req, res) {
    renderPage(req, res, 'music');
  });

  app.get('/resume', function(req, res) {
    renderPage(req, res, 'resume');
  });

  app.use(function(req, res, next) {
    res.status(404);
    renderPage(req, res, '404');
  });
};
