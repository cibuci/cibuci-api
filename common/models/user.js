// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var config = require('../../server/config.json');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');

function replaceHost(options, callback) {
  var verifyLink = url.parse(options.verifyHref);
  verifyLink.port = null;
  verifyLink.host = 'api.cibuci.com';
  verifyLink.protocol = 'https';
  var newLink = url.format(verifyLink);
  options.verifyHref = newLink;

  ejs.renderFile(options.template, options, callback);
}

module.exports = function(User) {
  // set default verify options.

  User.disableRemoteMethodByName('prototype.__count__accessTokens');
  User.disableRemoteMethodByName('prototype.__create__accessTokens');
  User.disableRemoteMethodByName('prototype.__delete__accessTokens');
  User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  User.disableRemoteMethodByName('prototype.__findById__accessTokens');
  User.disableRemoteMethodByName('prototype.__get__accessTokens');
  User.disableRemoteMethodByName('prototype.__updateById__accessTokens');


  /*User.once('attached', function (Uer) {
    var methods = User.sharedClass.methods();
    for (var i = methods.length - 1; i >= 0; i--) {
      console.log(methods[i].name);
    }
  });*/

  User.getVerifyOptions = function() {
    const base = User.base.getVerifyOptions();
    var templatePath =
      path.resolve(__dirname, '../../server/views/action-register.ejs');
    var options = Object.assign({}, base, {
      type: 'email',
      from: 'no-reply@cibuci.com',
      subject: '激活账号 - 辞不辞',
      template: templatePath,
      templateFn: replaceHost,
      redirect: 'http://cibuci.com/verified',
    });
    return options;
  };

  User.beforeRemote('create', function(context, user, next) {
    console.log('> User.beforeRemote triggered');
    context.args.data.createdAt = Date.now();
    next();
  });

  // send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote create triggered');

    var templatePath =
      path.resolve(__dirname, '../../server/views/action-register.ejs');

    var options = {
      type: 'email',
      to: user.email,
      from: 'no-reply@cibuci.com',
      subject: '激活账号 - 辞不辞',
      template: templatePath,
      templateFn: replaceHost,
      redirect: 'http://cibuci.com/verified',
      user: user,
    };

    user.verify(options, function(err, response) {
      if (err) {
        User.deleteById(user.id);
        return next(err);
      }

      console.log('> verification email sent:', response);
      next();
    });
  });

  // send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    var uri = `http://cibuci.com/reset-password/${info.accessToken.id}`;
    var templatePath =
      path.resolve(__dirname, '../../server/views/action-password-reset.ejs');
    var template = fs.readFileSync(templatePath, 'utf-8');
    var html = ejs.render(template, {url: uri});

    User.app.models.Email.send({
      to: info.email,
      from: 'no-reply@cibuci.com',
      subject: '重置密码 - 辞不辞',
      html: html,
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
