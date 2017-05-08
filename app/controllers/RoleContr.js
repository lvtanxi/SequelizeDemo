const ResultHelp = require('./../utils/ResultHelp');
const Role = require('./../models').Role;

exports.addRole = function (req, res) {
    Role.create(req.body).then(function () {
        new ResultHelp().sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

exports.findRoleById = function (req, res) {
    Role.findById(req.query.id).then(function (result) {
        new ResultHelp({data: result}).sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

exports.findRoles=function (req,res) {
    Role.findAll().then(function (result) {
        new ResultHelp({data: result}).sendJson(res)
    }).catch(function (error) {
        new ResultHelp({error: error}).sendJson(res)
    });
};

