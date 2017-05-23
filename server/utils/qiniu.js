var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = process.env.QINIU_AK;
qiniu.conf.SECRET_KEY = process.env.QINIU_SK;
var bucket = process.env.QINIU_BUCKET;

function uptoken(key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

module.exports.uptoken=uptoken;
