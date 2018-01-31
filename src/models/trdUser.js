// 三方用户表
'use strict'
module.exports = function(sequelize,DataTypes){
    var TrdUser = sequelize.define('trduser',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        userId: {
            type: DataTypes.STRING(32),
            field: "user_id",
            comment: "三方用户ID",
            references: {
              model: 'User',
              key: 'id'
            },
            allowNull: true, //可空
        },
        nickName: {
            type: DataTypes.STRING(32),
            field: "nick_name",
            comment: "用户昵称",
            allowNull: false
        },
        avatarUrl: {
            type: DataTypes.STRING(64),
            field: "avatar_url",
            comment: "用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。",
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(1),
            comment: "用户的性别，值为1时是男性，值为2时是女性，值为0时是未知",
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(16),
            comment: "用户所在城市",
            allowNull: true
        },
        province: {
            type: DataTypes.STRING(16),
            comment: "用户所在省份",
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(16),
            comment: "用户所在国家",
            allowNull: true
        },
        language: {
            type: DataTypes.STRING(1),
            comment: "用户的语言，简体中文为zh_CN",
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(8),
            comment: "三方用户类型，wexin-微信，qq-QQ",
            allowNull: false,
            defaultValue: 'wexin'
        },
        active: {
            type: DataTypes.BOOLEAN,
            comment: "系统用户创建状态，1-已创建，0-未创建",
            allowNull: false,
            defaultValue: false
        }
    },{
        indexes: [{
          name: 'thirdUser_userId',
          method: 'BTREE',
          fields: ['user_id']
        }],
        comment: "三方用户信息表"
    });

    // 创建表
    TrdUser.sync().then(() => {
      console.log('third-user table has created!');
    });

    return TrdUser;
}


