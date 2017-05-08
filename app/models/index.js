const sequelize = require('./../utils/SeqInstance').getSequelize();
const User = sequelize.import('./User.js');
const UserCheckin = sequelize.import('./UserCheckin.js');
const UserAddress = sequelize.import('./UserAddress.js');
const Role = sequelize.import('./Role.js');

// 建立模型之间的关系
//配置一对一关系
User.hasOne(UserCheckin); //主
UserCheckin.belongsTo(User);//从
//配置一对多
/**
 * foreignKey 从表中的列名
 * targetKey 外键指向主表的列名
 * address 查询时候地址对应的别名
 */
// User的实例拥有getUserAddress、setUserAddress、addNote、addUserAddress、createUserAddress、removeUserAddress、hasUserAddress方法
User.hasMany(UserAddress, {as: 'userAddress'});
//UserAddress.belongsTo(User);
//配置多对多
/**
 *through  as 都是必须的，但是有个疑问就是这样配置会查出中间表
 */
User.belongsToMany(Role, {through: 'userRoles', as: 'userRoles'});
Role.belongsToMany(User, {through: 'userRoles', as: 'userRoles'});

// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.UserCheckin = UserCheckin;
exports.UserAddress = UserAddress;
exports.Role = Role;