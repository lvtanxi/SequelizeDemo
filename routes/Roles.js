const router = require('express').Router();
const RoleContr = require("./../app/controllers/RoleContr");

router.get('/findRoleById',RoleContr.findRoleById);
router.get('/findRoles',RoleContr.findRoles);
router.post('/addRole',RoleContr.addRole);

module.exports = router;
