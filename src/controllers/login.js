// 用户登录控制器 login.js
'use strict'
let jwt = require('jsonwebtoken');
let redis = require('../libs/redis');
let config = require('../../config');
let User = require('../models/').User;

exports.login = function(req,res,next){
	console.log("welcome to login!");
	let userName = req.body.fname;
	let password = req.body.lname;
	if(!userName){
		res.json({code:6002, data:{}, msg:'userName is null!'});
	};
	if(!password){
		res.json({code:6002, data:{}, msg:'password is null!'});
	};
	User.findOne({
		where: {firstname: userName}
	}).then(user => {
		if(user.lastname == password){
			// 登录成功，生成token，写入redis
			let token = jwt.sign({'userId':user.id, 'expireIn': config.token.expire}, config.token.secret);
			redis.set(user.id,token, (err, ret) => {
				if(err) throw err;
				redis.expire(user.id,config.token.expire);
			});
			res.json({code:200, data:{'user': user,'token':token}, msg:'login success'});
		}else{
			res.json({code:6003, data:{}, msg:'password is incorrect!'});
		};
	});
};

exports.verifyAll = function(req,res,next){
	if('/login' == req.href()){
	  console.log('login request : %s', req.href());
	  next();
	}else{
		checkToken(req, res, next);
	};
};
// 验证请求头x-authenticate-token中的token
function checkToken(req, res, next){
	// 获取 token
	let token = req.headers['x-authenticate-token'];
	if(!token){
		res.json({code:6001, data:{}, msg:'authenticate failure!'});
	};
	// 验证token
	jwt.verify(token, config.token.secret, (err, decode) =>{
		if(err){
			res.json({code:401, data:{}, msg:'token verify error'});
		};
		// 验证token通过
		let expireIn = decode.expireIn;// 单位：秒，token有效时间
		let userId = decode.userId;

		redis.exists(userId, (err, ret) => {
			if(err) throw err;

			if(ret){
				// token有效，充值过期时间
				redis.expire(userId, expireIn);
				next();
			}else{
				// token无效
				res.json({code:401, data:{}, msg:'invalid token'});
			};
		});
	});
};
