var express = require('express');
var router = express.Router();
const controllers = require('../controllers/user')

router.post('/user/signup', controllers.usecraete)
router.post('/user/login', controllers.userlogin)
router.patch('/user/update', controllers.userupdate)
router.get('/user/findbyid', controllers.userfindbyid)


router.post('/contact/create', controllers.contactCreate)
router.delete('/contact/delete', controllers.contactDelete)
router.patch('/contact/update', controllers.contactupdate)
router.get('/contact/find', controllers.contactFind)



module.exports = router;
