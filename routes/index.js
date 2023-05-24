var express = require('express');
var router = express.Router();
var homeCtrl = require('../Controller/home.controller');

router.get('/',homeCtrl.index);

router.get('/login',homeCtrl.login);
router.post('/login',homeCtrl.login);

router.get('/create-accout',homeCtrl.createAc);

module.exports = router;
