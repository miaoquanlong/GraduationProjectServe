/**
 * Created by M.C on 2017/9/15.
 */
import fs from "fs"
import path from "path"
import Sequelize from "sequelize"

let db = null;


module.exports = app => {
  "use strict";
  if (!db) {
    const config = app.libs.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );

    db = {
      sequelize,
      Sequelize,
      models: {}
    };

    const dir = path.join(__dirname, "models");

    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });

    Object.keys(db.models).forEach(key => {
      db.models[key].associate(db.models);
    });
  }
  return db;
};

// 定义了defineModel方法，
// 这个方法中，我们规范了，
// 每个模型都要添加version、
// createUser以及updateUser三个字段、表名即为模型名，
// 以及数据的字符集为utf8mb4等等。那么，当我们要创建模型的时候，
// 通过调用defineModel方法就可以达到统一规范的效果。如下模型代码：
// 举例调用defineModel方法
// module.exports = db.defineModel('project_master', {
//   p_id: {
//       type: Sequelize.BIGINT(11),
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true
//   },
//   p_name: Sequelize.STRING(100),
//   p_academy: Sequelize.STRING(100),
//   p_start_date: Sequelize.STRING(10),
//   p_end_date: Sequelize.STRING(10),
//   p_days: Sequelize.DECIMAL(10, 1),
//   p_place: Sequelize.STRING(20),
//   p_owner: Sequelize.STRING(10),
//   p_operator: Sequelize.STRING(10),
//   p_is_fee: Sequelize.BIGINT(1),
//   p_state: Sequelize.BIGINT(2),  // 开启，关闭
//   p_bz: Sequelize.STRING(255),
// });


exports.defineModel = function(name, attributes) {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        // allowNull: false
      };
    }
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    // allowNull: false
  };
  attrs.createUser = {
    type: Sequelize.STRING,
    allowNull: false
  };
  attrs.updateUser = {
    type: Sequelize.STRING,
    allowNull: false
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    hooks: {
      beforeBulkCreate: function(obj) {
        obj.version = 0;
      },
      beforeValidate: function(obj) {
        if (obj.isNewRecord) {
          console.log('first');
          obj.version = 0;
        } else {
          console.log('not first');
          obj.version = obj.version + 1;
        }
      }
    }
  });
};