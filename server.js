// 入口文件server.js
'use strict'

const path = require('path'),
  restify = require('restify'),
  db = require('./src/models/'),
  config   = require('./config'),
  loginCtl = require('./src/controllers/login');

const serverConfig = {
  name: require(path.join(__dirname, 'package')).name,
  version: require(path.join(__dirname, 'package')).version,
};

const server = restify.createServer(serverConfig);
// server.pre((req,res,next) => {
//   console.log('req: %s', req.href());
//   next();
// });

server.use(restify.plugins.queryParser());
// server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(loginCtl.verifyAll);

require('./src/routes')(server);

server.on('NotFound', function (req, res, next) {
	res.send(404, req.url + ' was not found ' + config.sequelize.pool.idle);
});

module.exports = server;
