// 数据模型入口文件 models/index.js
'use strict'

let redis = require('redis');
let config = require('../../config');

let redisClent = redis.createClient(config.redis.port, config.redis.host);

module.exports = redisClent;
