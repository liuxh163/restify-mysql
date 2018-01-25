// 用户登录控制器 login.js
'use strict'
var User = require('../models/').User;
let redis = require('../libs/redis');

exports.getAll = function(req,res,next){
	User.all().then(users => {
		// if (err) return;
		res.send(users)
	});
};

exports.getByName = function(req,res,next){
	User.findOne({
		where: {firstname: req.params.name}
	}).then(user => {
		res.send(user)
	});
};

exports.updateUserByName = function(req,res,next){
	User.findOne({
		where: {firstname: req.params.name}
	}).then(user => {
		res.send(user)
	});
};

exports.createUser = function(req,res,next){
	User.create({
		firstname: req.body.fname,
		lastname: req.body.lname,
		active: false
	}).then(user => {
		redis.set(req.body.fname,req.body.lname,(e,ret) => {
			if(e) throw e;
			redis.expire(req.body.fname,2*60);
		});
		res.send('create user ok');
		next();
	});
};
