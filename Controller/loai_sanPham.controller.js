var myMD = require('../models/product.model');

exports.list_loai = async (req , res , next) =>{

    let dieu_kien_loc = null;
    let sortTL = null;

    if(req.params.typeSort != '0' && typeof(req.params.typeSort) != 'undefined'){
        sortTL = {name : req.params.typeSort};
        //console.log('loc chay');
    }

    if(req.query.fName != '' && String(req.query.fName) != 'undefined'){
        dieu_kien_loc = {name : {$regex : req.query.fName}};
    }
    
    let listLoai = await myMD.loaiModel.find(dieu_kien_loc).sort(sortTL);

    res.render('loai_sanPham/listLoai', {listLoai : listLoai , typeSort : req.params.typeSort ,fName : req.query.fName});
}

exports.add_loai = async (req , res , next) =>{
    let msg = '';
    let typeError = false;

    if(req.method == 'POST'){
        console.log(req.body.name);
        if(req.body.name == ''){
            msg = 'Vui lòng nhập tên thể loại';
            typeError = true;
            return res.render('loai_sanPham/addLoai',{msg : msg , typeError : typeError});
        }

        let objL = await myMD.loaiModel.findOne({name : req.body.name});
        console.log("d" + objL + "d")
        if(objL != null){
            typeError = true;
            msg = "Thể loại đã tồn tại";
            return res.render('loai_sanPham/addLoai',{msg : msg , typeError : typeError});
        }

        let objLoai = new myMD.loaiModel();
        objLoai.name = req.body.name;
        

        try{
            await objLoai.save();
            msg = 'Đã thêm thành công';
            typeError = false;
        }catch(error){
            msg = 'loi ghi csld' + error.message;
            typeError = true;
            console.log(error);
        }
    }
    res.render('loai_sanPham/addLoai',{msg : msg , typeError : typeError});
}

exports.update_loai = async (req , res , next) =>{
    let msg = '';

    if (req.method == 'POST') {
        let idLoai = req.body.idLoai;
        let objLoai = await myMD.loaiModel.findById(idLoai);
        objLoai.name = req.body.name;
       
        try{
            await myMD.loaiModel.findByIdAndUpdate(idLoai, objLoai);
            res.redirect('/category');
            msg = "Sửa thể tài khoản thành công"
        }catch(error){
            console.log(error)
            msg = "Sửa thể tài khoản không thành công"
        }
    }

    res.render('loai_sanPham/listLoai', { msg });
}

exports.delete_loai = async (req , res , next) => {
    let msg = '';

    let listSP = await myMD.spModel.find({id_category : req.params.idLoai});
    listSP.forEach( async (row) => {
        await myMD.spModel.findByIdAndDelete(row._id);
    });

    try {
        await myMD.loaiModel.findByIdAndDelete(req.params.idLoai);
        msg = 'Xóa thành công'
        res.redirect('/category');
    } catch (error) {
        console.log(error);
    }
    
    res.render('loai_sanPham/listLoai', { msg });
}