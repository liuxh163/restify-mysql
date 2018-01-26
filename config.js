/**
 * app config
 */
'use strict'

var path = require('path');

var config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 应用域名
  host: 'localhost',
  // 程序运行的端口
  port: process.env.PORT || '3000',

  // sequlize+mysql配置
  sequelize: {
    username: 'root',
    password: '',
    database: 'wxtext',
    host: "127.0.0.1",
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 1000
    },
    define: {
      underscored: true,//额外字段以下划线来分割,createdAt: "created_at"
      timestamps: true,//默认生成createdAt、updatedAt字段
      paranoid: true, //虚拟删除，需要启用timestamps，会写入deletedAt字段
      freezeTableName: true // Model 对应的表名将与model名相同
      // version: true //可以启用数据版本控制
      // engine: 'MYISAM' 默认使用InnoDB
    }
  },

  // redis 配置，默认是本地
  redis: {
    host: '127.0.0.1',
    port: 6379,
    database: 0
  },

  // token加密密钥，生产环境务必修改
  token: {
    secret: 'i_am_the_first_api_server_by_liuxh_in_2018_01_22',
    expire: 1.5*60,
    schema: '525fang'
  },

  // 业务相关设置
  biz: {
    topic_count: 20,
    create_post_per_day: 1000, // 每个用户一天可以发的主题数
    create_reply_per_day: 1000, // 每个用户一天可以发的评论数
    create_user_per_ip: 1000,
    visit_per_day: 1000 // 每个 ip 每天能访问的次数
  },

  logs: {
    dir: path.join(__dirname, '../logs'),
    level: 'debug'
  },

  // 邮箱配置
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club'
    },
    ignoreTLS: true,
  },

  // 7牛的access信息，用于文件上传
  qn_access: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://your qiniu domain',
    // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
    // 如果在国内，此项请留空
    uploadURL: 'http://xxxxxxxx',
  },

  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  },

  file_limit: '1MB',
};
// 测试环境配置
if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/node_club_test';
}

module.exports = config;
