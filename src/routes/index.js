// 路由配置 入口文件 routes/index.js
'use strict'
let loginCtl = require('../controllers/login');
module.exports = function(server){
	server.post('/login',loginCtl.login);
	// 引入用户路由配置
	require('./user')(server);
};
