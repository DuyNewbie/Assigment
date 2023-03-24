var express = require('express');
var router = express.Router();
var homeCtrl = require('../Controller/home.controller');

router.get('/',homeCtrl.index);

module.exports = router;
