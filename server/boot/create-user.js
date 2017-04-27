'use strict';

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {username: 'wayne', email: 'wayne@cibuci.com', password: 'ilovecibuci'},
    {username: 'bella', email: 'mi@cibuci.com', password: 'ilovecibuci'},
    {username: 'zicong', email: 'zhangzicong@cibuci.com', password: 'ilovecibuci'},
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    // Create the admin role
    Role.create({
      name: 'admin',
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // make wayne, bella, zicong as admin
      role.principals.create([
        {principalType: RoleMapping.USER, principalId: users[0].id},
      ], function(err, principals) {
        if (err) throw err;

        console.log('Created principals: ', principals);
      });
    });
  });
};
