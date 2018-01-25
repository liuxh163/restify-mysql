// 数据模型入口文件 models/index.js
'use strict'

let Sequelize = require('sequelize');
let config = require('../../config');

let db = new Sequelize(config.sequelize.database,
	config.sequelize.username,config.sequelize.password,{
		host: config.sequelize.host,
		port: config.sequelize.port,
		operatorsAliases: false,
		dialect: config.sequelize.dialect,
		timezone: config.sequelize.timezone,
		pool: {
			min: config.sequelize.pool.min,
			max: config.sequelize.pool.max,
			acquire: config.sequelize.pool.acquire,
			idle: config.sequelize.pool.idle
		},
		define: {
      underscored: config.sequelize.define.underscored,
      timestamps: config.sequelize.define.timestamps,
      paranoid: config.sequelize.define.paranoid,
      freezeTableName: config.sequelize.define.freezeTableName
    }
	});

exports.Mysql = db;
exports.Sequelize = Sequelize;
