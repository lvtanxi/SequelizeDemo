const Sequelize = require('sequelize');
exports.getSequelize=function () {
    const sequelize= new Sequelize('test', 'root', 'lv169168', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            freezeTableName:true,// 自定义表名
            underscored: false,  // 字段以下划线（_）来分割（默认是驼峰命名风格）
            timestamps: true, //添加创建和修改时间
            harset: 'utf8', //字符编码
            collate: 'utf8_general_ci' //数据库排序规则
        }
    });
    return sequelize
};