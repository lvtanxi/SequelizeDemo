module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Role', {
		id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true, comment:'角色Id' },
		roleName: { type: DataTypes.STRING, field: 'role_name', comment:'角色名' }
	},
	{
		timestamps: false,
		tableName: 'role'
	});
}
