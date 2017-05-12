'use strict';

module.exports = function(Assesstopiccomment) {
	Assesstopiccomment.beforeRemote('create', function(context, comment, next) {
	    console.log('> Assesstopiccomment.beforeRemote triggered');

	    context.args.data.createdAt = Date.now();
	    context.args.data.authorId = context.req.accessToken.userId;

	    next();
	});
};
