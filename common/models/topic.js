'use strict';

module.exports = function(Topic) {
  Topic.beforeRemote('create', function(context, user, next) {
    console.log('> Topic.beforeRemote triggered');

    context.args.data.createdAt = Date.now();
    context.args.data.authorId = context.req.accessToken.userId;

    next();
  });
};
