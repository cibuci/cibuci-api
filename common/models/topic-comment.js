'use strict';

module.exports = function(Topiccomment) {
	var app = require('../../server/server');

	Topiccomment.beforeRemote('create', function(context, comment, next) {
	    console.log('> Topiccomment.beforeRemote triggered');

	    context.args.data.createdAt = Date.now();
	    context.args.data.authorId = context.req.accessToken.userId;

	    next();
	  });

	Topiccomment.afterRemote('create',function(context, comment, next){
		var Topic = app.models.Topic;
		Topic.findById(comment.topicId,{},function(err, topic){
			var modify = {
				lastReplyAt: comment.createdAt,
				lastReplyerId: comment.authorId,
				commentsCount: topic.commentsCount + 1,
			};
			topic.updateAttributes(modify,function(err,instance){
				next();
			});
		});
	});
};
