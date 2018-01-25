// 数据模型入口文件 models/index.js
'use strict'
let mysql = require('../libs/mysql').Mysql;
let DataTypes = require('../libs/mysql').Sequelize;
// const Sequelize = require('sequelize');
// const path = require('path');
// const config = require(path.join(__dirname, '../../config'));

// const db = new Sequelize(config.sequelize.database,
// 	config.sequelize.username,config.sequelize.password,{
// 		host: config.sequelize.host,
// 		port: config.sequelize.port,
// 		operatorsAliases: false,
// 		dialect: config.sequelize.dialect,
// 		pool: {
// 			min: config.sequelize.pool.min,
// 			max: config.sequelize.pool.max,
// 			acquire: config.sequelize.pool.acquire,
// 			idle: config.sequelize.pool.idle
// 		},
// 		define: {
//       underscored: config.sequelize.define.underscored,
//       timestamps: config.sequelize.define.timestamps,
//       paranoid: config.sequelize.define.paranoid,
//       freezeTableName: config.sequelize.define.freezeTableName
//     }
// 	});
// 加载所有数据模型
exports.User = require('./user')(mysql,DataTypes);
