module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserAddress', {
            id: {
                type: DataTypes.BIGINT(11),
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                comment: '主键'
            },
            consignee: {type: DataTypes.STRING, field: 'consignee', allowNull: false, comment: '收货人'},
            address: {
                type: DataTypes.STRING(1024),
                allowNull: false,
                comment: '详细地址'
            },
            zipCode: {
                type: DataTypes.STRING(12),
                allowNull: true,
                comment: '邮编'
            },
            tel: {type: DataTypes.STRING(32), field: 'tel', allowNull: false, comment: '电话'},
        },
        {
            timestamps: false, //添加创建和修改时间
            underscored: true,//以下划线来解决驼峰问题
            freezeTableName: true,// 冻结表名
            tableName: 'userAddress',
            comment: '用户地址表',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
};
