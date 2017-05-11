'use strict';

module.exports = function(Argue) {
  Argue.beforeRemote('create', function(context, user, next) {
    console.log('> Argue.beforeRemote triggered');

    context.args.data.createdAt = Date.now();
    context.args.data.authorId = context.req.accessToken.userId;

    next();
  });
};
