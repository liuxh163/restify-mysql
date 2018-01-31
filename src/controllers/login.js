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
		return res.json({code:6002, data:{}, msg:'userName is null!'});
	};
	if(!password){
		return res.json({code:6002, data:{}, msg:'password is null!'});
	};
	User.findOne({
		where: {firstname: userName}
	}).then(user => {
		if(user.lastname == password){
			// 登录成功，生成token，写入redis
			// let token = jwt.sign({'userId':user.id}, config.token.secret,{expiresIn: config.token.expire});
			let token = jwt.sign({'userId':user.id}, config.token.secret);
			let redisKey = token.split('.')[2];
			redis.set(redisKey, user.id, (err, ret) => {
				if(err) throw err;
				redis.expire(redisKey,config.token.expire);
			});
			return res.json({code:200, data:{'user': user,'token':token}, msg:'login success'});
		}else{
			return res.json({code:6003, data:{}, msg:'password is incorrect!'});
		};
	});
};

exports.verifyAll = function(req,res,next){
	if('/login' == req.href() || '/addUser' == req.href()){
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
		return res.json({code:6001, data:{}, msg:'authenticate failure!'});
	};
	// 验证token
	jwt.verify(token, config.token.secret, (err, decode) =>{
		if(err){
			return res.json({code:401, data:{}, msg:'token is invalid'});
		};
		// 验证token通过
		let expireIn = config.token.expire;// 单位：秒，token有效时间
		let redisKey = token.split('.')[2];
		let userId = decode.userId;

		redis.exists(redisKey, (err, ret) => {
			if(err) throw err;

			if(ret){
				// token有效，充值过期时间
				redis.expire(redisKey, expireIn);
				next();
			}else{
				// token无效
				return res.json({code:401, data:{}, msg:'token is expired'});
			};
		});
	});
};
