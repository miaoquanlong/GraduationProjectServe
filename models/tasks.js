/**
 * Created by M.C on 2017/9/15.
 */
module.exports = (sequelize, DataType) => {
    "use strict";
    const Tasks = sequelize.define("Tasks", {
        id: {
          type: DataType.UUID,// 	设置最大重试次数
          primaryKey: true, // 	指定是否是主键
          autoIncrement: false, // 是否自增
          defaultValue:DataType.UUIDV1
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users);
    };
    return Tasks;
};

