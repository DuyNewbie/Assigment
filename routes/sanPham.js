var express = require('express');
var router = express.Router();
var sanPhamCtrl = require('../Controller/sanPham.controller');
var check_login = require('../middlewares/check_login');

router.get('/',sanPhamCtrl.listSp);
router.post('/',sanPhamCtrl.update_sp);
router.get('/id_category/:idLoai',sanPhamCtrl.listSp);

// router.get('/sort/:typeSort',sanPhamCtrl.listSp);
router.get('/sort/:typeSort/:column',check_login.yeu_cau_dang_nhap,sanPhamCtrl.listSp);

router.get('/add-sp',sanPhamCtrl.addSp);
router.post('/add-sp',sanPhamCtrl.addSp);

router.get('/delete/:idSP',check_login.yeu_cau_dang_nhap,sanPhamCtrl.delete_sp);

router.get('/chi-tiet/:idSP',check_login.yeu_cau_dang_nhap,sanPhamCtrl.chiTietSP);

router.get('/find-name',check_login.yeu_cau_dang_nhap,sanPhamCtrl.listSp);

module.exports = router;