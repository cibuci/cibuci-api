'use strict';

var async = require('async');

module.exports = function(app) {
  var mongoDataSource = app.dataSources.db;

  // create all models
  async.parallel({
    articles: async.apply(createArticles),
  }, function(err, results) {
    if (err) throw err;
    createComments(results.articles, function(err) {
      console.log('> models created sucessfully');
    });
  });

  // create reviewers
  function createArticles(cb) {
    mongoDataSource.automigrate('Article', function(err) {
      if (err) return cb(err);
      var Article = app.models.Article;
      Article.create([{
        title: '123',
        content: '123',
        createdAt: Date.now(),
      }, {
        title: '123',
        content: '123',
        createdAt: Date.now(),
      }, {
        title: '123',
        content: '123',
        createdAt: Date.now(),
      }], cb);
    });
  }

  // create reviews
  function createComments(articles, cb) {
    console.log(articles);
    cb();
  }
};
