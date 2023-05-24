var express = require('express');
var router = express.Router();
var user_api = require('../Controller/api/user.api');
var product_api = require('../Controller/api/product.api');

//  URL:   GET:   /api/users
router.get('/users', user_api.list );
router.get('/sp',product_api.listSp);
router.get('/loai',product_api.listLoai);


router.post('/users',user_api.add);
router.put('/users/:idu', user_api.edit);
router.delete('/users/:idu', user_api.delete);

router.post('/sp',product_api.add);
router.put('/sp/:idu', product_api.edit);
router.delete('/sp/:idu', product_api.delete);

router.post('/loai',product_api.add);
router.put('/loai/:idu', product_api.edit);
router.delete('/loai/:idu', product_api.delete);

module.exports = router;
