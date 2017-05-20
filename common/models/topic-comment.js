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

	Topiccomment.observe('before delete',function(ctx, next){
	  console.log('> Topiccomment.afterRemote delete triggered');

		Topiccomment.findById(ctx.where.id, {}, function(err, comment) {
			if(comment && comment.topicId) {
				var Topic = ctx.Model.app.models.Topic;
				Topic.findById(comment.topicId,{},function(err, topic){
					var modify = {
						commentsCount: (topic.commentsCount > 0 ? topic.commentsCount - 1 : 0),
					};
					topic.updateAttributes(modify,function(err,instance){
						next();
					});
				});
			} else {
				next();
			}
		});
	});
};
