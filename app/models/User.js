module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
		id:{type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
		username: { type: DataTypes.STRING,  allowNull: false, comment:'用户名' },
		password: { type: DataTypes.STRING, allowNull: false, comment:'用户密码' },
		active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment:'是否正常状态' }
	},
	{
		timestamps: true, //添加创建和修改时间
		underscored: true,//以下划线来解决驼峰问题
		freezeTableName: true,// 冻结表名
		tableName: 'user', //设置表的名称
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});
}
