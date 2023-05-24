var express = require('express');
var router = express.Router();
var userCtrl = require('../Controller/user.controller');
var check_login = require('../middlewares/check_login');

router.get('/',check_login.yeu_cau_dang_nhap,userCtrl.qlTaiKhoan);
router.post('/', userCtrl.suaTaiKhoan);
// router.get('/sort/:typeSort',userCtrl.qlTaiKhoan);
router.get('/sort/:typeSort/:column',check_login.yeu_cau_dang_nhap,userCtrl.qlTaiKhoan);

router.get('/them-tai-khoan',check_login.yeu_cau_dang_nhap,userCtrl.addTaiKhoan);
router.get('/xoa-tai-khoan/:idUser',check_login.yeu_cau_dang_nhap,userCtrl.xoaTaiKhoan);
router.post('/them-tai-khoan',check_login.yeu_cau_dang_nhap,userCtrl.addTaiKhoan);

router.get('/find-username',check_login.yeu_cau_dang_nhap,userCtrl.qlTaiKhoan);

module.exports = router;
