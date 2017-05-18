'use strict';

module.exports = function(Topic) {
  Topic.beforeRemote('create', function(context, user, next) {
    console.log('> Topic.beforeRemote triggered');

    context.args.data.createdAt = Date.now();
    context.args.data.lastReplyAt = Date.now();
    context.args.data.authorId = context.req.accessToken.userId;

    next();
  });

  Topic.afterRemote('findById', function(ctx, topic, next) {
    if (!topic) return next();

    topic.readCount = topic.readCount ? topic.readCount + 1 : 1;
  	topic.save(function(err) {
      next(err);
    });
  });
};
