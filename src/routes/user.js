// 用户路由配置文件 routes/user.js
'use strict'
let PATH = "/users";
let userCtl = require('../controllers/user');

module.exports = function(server){
	console.log('now in user routers');
  server.get({path: PATH, version: '1.0.1'}, userCtl.getAll);
  server.get({path: PATH + '/:name', version: ['1.0.1','1.0.2']}, userCtl.getByName);
  server.post({path: '/addUser'}, userCtl.createUser);
}
