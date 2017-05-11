'use strict';

module.exports = function(Article) {
  Article.beforeRemote('create', function(context, artice, next) {
    console.log('> Article.beforeRemote triggered');

    context.args.data.createdAt = Date.now();
    context.args.data.authorId = context.req.accessToken.userId;

    next();
  });
  Article.afterRemote('findById',function(context, artice, next){
  	artice.readCount+=1;
  	artice.save();
  	next();
  });
};
