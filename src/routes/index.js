// 路由配置 入口文件 routes/index.js
'use strict'

module.exports = function(server){
	/* GET home page. */
	server.get('/login', function(req, res, next) {
		console.log("welcome to login!");
		next();
	});
	// 引入用户路由配置
	require('./user')(server);
};
