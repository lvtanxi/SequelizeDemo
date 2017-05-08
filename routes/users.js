const express = require('express');
const router = express.Router();
const UserContr = require("./../app/controllers/UserContr");

router.post("/addUser", UserContr.addUser);
router.get("/findUsers", UserContr.findUsers);
router.get("/findUserByPage", UserContr.findUserByPage);
router.get("/findUserById", UserContr.findUserById);
router.post("/update", UserContr.update);
router.post("/delete", UserContr.delete);
module.exports = router;
