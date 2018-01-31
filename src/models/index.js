// 数据模型入口文件 models/index.js
'use strict'
let mysql = require('../libs/mysql').Mysql;
let DataTypes = require('../libs/mysql').Sequelize;

// 加载所有数据模型
exports.User = require('./user')(mysql,DataTypes);
exports.TrdUser = require('./trdUser')(mysql,DataTypes);
