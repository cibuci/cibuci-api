'use strict';

module.exports = function(Assessarguecomment) {
	Assessarguecomment.beforeRemote('create', function(context, comment, next) {
	    console.log('> Assessarguecomment.beforeRemote triggered');

	    context.args.data.createdAt = Date.now();
	    context.args.data.authorId = context.req.accessToken.userId;

	    next();
	});
};
