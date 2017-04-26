'use strict';

module.exports = function(Article) {
  Article.beforeRemote('create', function(context, user, next) {
    console.log('> Article.beforeRemote triggered');

    context.args.data.createdAt = Date.now();
    context.args.data.authorId = context.req.accessToken.userId;

    console.log(context.req.accessToken);
    console.log(context.args.data);

    next();
  });
};
