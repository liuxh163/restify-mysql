// 系统用户表
'use strict'
module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        firstname: {
            type: DataTypes.STRING(10),
            field: "first_name",
            comment: "I'm a comment!",
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(20),
            field: "last_name",
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        // 用户激活状态 true 激活 false 未激活
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },{
        getterMethods: {
            fullName: function()  {
                return this.firstname + ' ' + this.lastname
            }
        },
        setterMethods: {
            fullName: function(value){
                let names = value.split(' ');
                this.setDataValue('firstname', names.slice(0, -1).join(' '));
                this.setDataValue('lastname', names.slice(-1).join(' '));
            }
        }
    },{
        comment: "用户信息类"  // 适用于MySQL and PG
    });

    // 创建表，force: true will drop the table if it already exists User.sync({force: false}).then(() => {
    User.sync().then(() => {
      console.log('user table has created!');
    });

    return User;
}


