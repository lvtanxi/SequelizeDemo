const ResultHelp = require('./../utils/ResultHelp');
const User = require("./../models").User;
const Role = require("./../models").Role;
const UserCheckin = require("./../models").UserCheckin;
const UserAddress = require("./../models").UserAddress;

const sequelize = require("./../utils/SeqInstance").getSequelize();


exports.addUser = function (req, res) {
    let checkIn = UserCheckin.build(req.body.userCheckin);
    sequelize.transaction(function (t) {
        return Promise.all([
            Role.findAll({
                where: {
                    id: [req.body.roleIds]
                }
            }),
            User.create(req.body, {transaction: t}),
            /**
             *  individualHooks: true 很关键，批量插入必须使用这个，不然是不会返回数据的id，
             *  单个插入可以不需要
             */
            UserAddress.bulkCreate(req.body.userAddress, {transaction: t, individualHooks: true})
        ]).then(function (result) {
            return Promise.all([
                result[1].setUserRoles(result[0], {transaction: t}),
                result[1].setUserCheckin(checkIn, {transaction: t}),
                result[1].addUserAddress(result[2], {transaction: t}),
            ])
        });
    }).then(function () {
        new ResultHelp().sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

exports.findUsers = function (req, res) {
    User.findAll({
        include: [{model: Role, as: "userRoles"}, {
            model: UserAddress,
            as: "userAddress"
        }, UserCheckin]
    }).then(function (users) {
        new ResultHelp({data: users}).sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    })
};

exports.findUserById = function (req, res) {
    User.findById(req.query.id)
        .then(function (users) {
            new ResultHelp({data: users}).sendJson(res)
        }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    })
};
/**
 * 分页查询
 * limit 注意要强转一次
 */
exports.findUserByPage = function (req, res) {
    User.findAll({
        limit: parseInt(req.query.pageSize),
        offset: (req.query.pageNo - 1) * req.query.pageSize
    }).then(function (users) {
        new ResultHelp({data: users}).sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    })
};

/**
 * 修改用户权限
 */
exports.update = function (req, res) {
    sequelize.transaction(function (t) {
        return Promise.all([
            User.findById(req.body.userid),
            Role.findById(req.body.roleid),
        ]).then(function (result) {
            return result[0].removeUserRoles(result[1]) //移除某一个权限
        })
    }).then(function () {
        new ResultHelp().sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

/**
 * 实际情况中一般都是逻辑是删除，这里就这的真删除
 */
exports.delete = function (req, res) {
    User.destroy({
        where: {id: req.body.id}
    }).then(function () {
        new ResultHelp().sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

