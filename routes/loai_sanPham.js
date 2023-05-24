var express = require('express');
var router = express.Router();
var loai_sanPhamCtrl = require('../Controller/loai_sanPham.controller');
var check_login = require('../middlewares/check_login');

router.get('/',loai_sanPhamCtrl.list_loai);
router.post('/',loai_sanPhamCtrl.update_loai);

router.get('/add-category',loai_sanPhamCtrl.add_loai);
router.post('/add-category',loai_sanPhamCtrl.add_loai);

router.get('/delete/:idLoai',check_login.yeu_cau_dang_nhap,loai_sanPhamCtrl.delete_loai);

router.get('/sort/:typeSort',check_login.yeu_cau_dang_nhap,loai_sanPhamCtrl.list_loai);

router.get('/find-name',check_login.yeu_cau_dang_nhap,loai_sanPhamCtrl.list_loai);


module.exports = router;