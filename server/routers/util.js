var router = module.exports.router = require('loopback').Router();
var qiniu_util = require('../utils/qiniu.js');


router.get('/qiniu/token', function(req, res, next) {
  var file_name = req.query.file_name;
  var token = qiniu_util.uptoken(file_name);
  return res.json({'token':token});
});