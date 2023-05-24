var myMD = require('../models/product.model');

exports.listSp = async (req , res , next) =>{
    let dieu_kien_loc = null;
    let sortTL = null;
    let sortN = 0;

    if(req.params.typeSort != '0' && typeof(req.params.typeSort) != 'undefined'){
        if(req.params.typeSort == 1 ){
            sortN = -1;
        }else{
            sortN = 1
        }

        if(req.params.column == 'name'){
            sortTL = {name : sortN};
            
        }else if(req.params.column == 'price'){
            sortTL = {price : sortN};
        }
        //console.log('loc chay');
    }else{
        sortN = 1;
    }

    if(req.query.fName != '' && String(req.query.fName) != 'undefined'){
        dieu_kien_loc = {name : {$regex : req.query.fName}};
    }

    if(req.params.idLoai != '0' && typeof(req.params.idLoai) != 'undefined'){
        dieu_kien_loc = {id_category : req.params.idLoai};
        //console.log('loc chay');
    }

    let listSP = await myMD.spModel.find(dieu_kien_loc).populate('id_category').sort(sortTL)
    let listTL = await myMD.loaiModel.find();

    // console.log(listSP + '  dd  ' + String(req.params.idLoai) + '__' + dieu_kien_loc);

    res.render('sanPham/listSP',{listSP, listTL , idLoaiFind : req.params.idLoai , fName : req.query.fName , typeSort : sortN});
}

exports.addSp = async (req , res , next) =>{
    let msg = '';

    let listTL = await myMD.loaiModel.find();

    if(req.method == 'POST'){
        //
        let objSP = new myMD.spModel();
        objSP.avatar = req.body.avatar;
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.description = req.body.description;
        objSP.id_category = req.body.category;
        //
        try{
            await objSP.save();
            msg = 'da them thanh cong';
        }catch(error){
            msg = 'loi ghi csld' + error.message;
            console.log(error);
        }
    }
    res.render('sanPham/addSp',{msg : msg , listTL : listTL});
}

exports.update_sp = async (req,res,next) => {
    let msg = '';
    
    if (req.method == 'POST') {
        let objSP = await myMD.spModel.findById(req.body.idSP);
        
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.description = req.body.description;
        objSP.id_category = req.body.category;
       
        try{
            await myMD.spModel.findByIdAndUpdate(req.body.idSP, objSP);
            res.redirect('/sp');
            msg = "Sửa thể tài khoản thành công"
        }catch(error){
            console.log(error)
            msg = "Sửa thể tài khoản không thành công"
        }
    }

    res.render('sanPham/listSP', {msg});
}

exports.delete_sp = async (req ,res ,next) =>{
    let msg = '';

    try {
        await myMD.spModel.findByIdAndDelete(req.params.idSP);
        msg = 'Xóa thành công'
        res.redirect('/sp');
    } catch (error) {
        console.log(error);
    }

    res.render('sanPham/listSP', {msg});
}

exports.chiTietSP = async (req ,res ,next) =>{
    let objSP = await myMD.spModel.findById(req.params.idSP);
    let objTL = await myMD.loaiModel.findById(objSP.id_category);

    res.render('sanPham/ttSP',{objSP,objTL});
}