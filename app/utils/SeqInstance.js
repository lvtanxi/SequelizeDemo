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
    });
    return sequelize
};