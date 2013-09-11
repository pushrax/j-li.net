var fs = require('fs')
  , _ = require('underscore');

module.exports = function(app) {
  function respond(req, res, view, data, status) {
    var title = view;
    if (view == 'index') title = '';

    var options = { title: title, view: view, partial: false };
    _.extend(options, data);

    if (req.xhr || req.query.ajax != null) {
      options.partial = true;
      res.render(view, options, function(err, html) {
        res.json({ title: options.title, view: view, html: html, status: status || 200 });
      });
    } else {
      if (status) res.status(status);
      res.render(view, options);
    }
  }

  app.get('/', function(req, res) {
    respond(req, res, 'index');
  });

  app.get('/projects', function(req, res) {
    respond(req, res, 'projects');
  });

  app.get('/music', function(req, res) {
    respond(req, res, 'music');
  });

  app.get('/resume', function(req, res) {
    respond(req, res, 'resume');
  });

  app.get('/posts', function(req, res) {
    respond(req, res, 'blog', { page: 0, posts: app.blog.posts(0, 10), postCount: app.blog.postCount() });
  });

  app.get('/posts/:page([0-9]+)', function(req, res, next) {
    var page = parseInt(req.param('page')) - 1;
    if (!page) return next();

    var posts = app.blog.posts(10 * page, 10);
    if (posts.length <= 0) return next();

    respond(req, res, 'blog', { title: 'Page ' + (page + 1) + ' » blog', page: page, posts: posts, postCount: app.blog.postCount() });
  });

  app.get('/posts/tag/:tag', function(req, res, next) {
    var tag = req.param('tag');

    var posts = app.blog.postsForTag(tag);
    if (posts.length <= 0) return next();

    respond(req, res, 'blog', { title: tag + ' » blog', tag: tag, page: 0, posts: posts, postCount: app.blog.postCountForTag(tag) });
  });

  app.get('/posts/tag/:tag/:page([0-9]+)', function(req, res, next) {
    var tag = req.param('tag');

    var page = parseInt(req.param('page'), 10) - 1;
    if (page < 0) return res.redirect('/blog/tag/' + tag);

    var posts = app.blog.postsForTag(tag, 10 * page, 10);
    if (posts.length <= 0) return next();

    respond(req, res, 'blog', { title: tag + ', Page ' + (page + 1) + ' » blog', tag: tag, page: page, posts: posts, postCount: app.blog.postCountForTag(tag) });
  });

  app.get('/blog/rss', function(req, res) {
    //res.header('Content-Type', 'application/rss+xml');
    res.render('blog_rss', { posts: app.blog.posts() }, function(err, result) {
      res.contentType('xml');
      res.send(result);
    });
  });

  app.get('/posts/:name', function(req, res, next) {
    var post = app.blog.post(req.param('name'));
    if (!post) return next();

    respond(req, res, 'blog_post', { title: post.title + ' » blog', post: post });
  });

  app.use(function(req, res, next) {
    respond(req, res, '404', {}, 404);
  });
};
