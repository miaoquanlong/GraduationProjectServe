/**
 * Created by M.C on 2017/9/15.
 */
import bcrypt from "bcrypt-nodejs"
module.exports = (sequelize, DataType) => {
  "use strict";
  const Users = sequelize.define("Users", {
    id: {
      type: DataType.UUID,// 	设置最大重试次数
      primaryKey: true, // 	指定是否是主键
      autoIncrement: false, // 是否自增
      defaultValue:DataType.UUIDV1
    },
    username: {
      type: DataType.STRING, // 执行的查询类型，sequelize会根据这个类型对返回结果格式化。可以设置为一个字符串，或是通过Sequelize.QueryTypes来设置
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: false,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  Users.associate = (models) => {
    Users.hasMany(models.Tasks);
  };
  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  return Users;
};