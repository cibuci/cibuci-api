'use strict';

module.exports = function(Arguecomment) {
	var app = require('../../server/server');

	Arguecomment.beforeRemote('create', function(context, comment, next) {
	    console.log('> Arguecomment.beforeRemote triggered');

	    context.args.data.createdAt = Date.now();
	    context.args.data.authorId = context.req.accessToken.userId;

	    next();
	  });

	Arguecomment.afterRemote('create',function(context, comment, next){
		var Argue = app.models.Argue;

		Argue.findById(comment.argueId,{},function(err, argue){
			data = {};
			if(comment.point=='positive'){
				data['positiveCount'] = argue.positiveCount+1;
			}else{
				data['negativeCount'] = argue.negativeCount+1;
			}
			argue.updateAttributes(data,function(err,instance){
				next();
			});
		});
	});
};
