module.exports = function (sequelize, DataTypes) {
	return sequelize.define('UserCheckin', {
		id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
		userId: { 
			type: DataTypes.BIGINT(11), 
			unique: true,
			references: {
				model: 'User',
				key: 'id'
			},
			comment:'用户Id' },
		loginIp: { type: DataTypes.STRING,allowNull: false, defaultValue: '' , comment:'登录IP'}
	},
	{
		tableName: 'userCheckin',
		comment: '用户登录信息',
		indexes: [{
			name: 'userCheckin_userId',
			method: 'BTREE',
			fields: ['userId']
		}]
	});
}

