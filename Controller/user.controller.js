var myMD = require('../models/user.model');

exports.qlTaiKhoan = async (req, res, next) => {
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
            
        }else if(req.params.column == 'user_name'){
            sortTL = {user_name : sortN};
        }else if(req.params.column == 'email'){
            sortTL = {email : sortN};
        }

        //console.log('loc chay');
    }else{
        sortN = 1;
    }

    if(req.query.fUserName != '' && String(req.query.fUserName) != 'undefined'){
        dieu_kien_loc = {user_name : req.query.fUserName};
    }

    let listUser = await myMD.userModel.find(dieu_kien_loc).sort(sortTL);

    res.render('user/qlTaiKhoan', { listUser: listUser ,typeSort : sortN , username : req.query.fUserName});
}

exports.addTaiKhoan = async (req, res, next) => {
    let typeError = false;
    let msg = '';

    if (req.method == 'POST') {
        if(req.body.user_name == ''){
            typeError = true;
            msg = "Vui lòng nhập Tên đăng nhập";
        }else if(req.body.name == ''){
            typeError = true;
            msg = "Vui lòng nhập Tên đầy đủ";
        }else if(req.body.email == ''){
            typeError = true;
            msg = "Vui lòng nhập Email";
        }else if(req.body.password == ''){
            typeError = true;
            msg = "Vui lòng nhập Password";
        }else if(req.body.rePassword == ''){
            typeError = true;
            msg = "Vui lòng nhập RePassword";
        }else{
            if(req.body.password == req.body.rePassword){
                let objCUser = await myMD.userModel.findOne({user_name : req.body.user_name});
                let objCEmail = await myMD.userModel.findOne({email : req.body.email});
                if(objCUser != null){
                    typeError = true;
                    msg = "User đã tồn tại";
                }else if(objCEmail != null){
                    typeError = true;
                    msg = "Email đã tồn tại";
                }else{
                    let objUser = new myMD.userModel();
                    objUser.avatar = req.body.avatar;
                    objUser.name = req.body.name;
                    objUser.user_name = req.body.user_name;
                    objUser.email = req.body.email;
                    objUser.password = req.body.password;
                    objUser.role = 'User';

                    try {
                        await objUser.save();
                        typeError = false;
                        msg = "Đã thêm thành công";
                    } catch (error) {
                        msg = 'loi ghi csld' + error.message;
                        console.log(error);
                    }
                }
            }else{
                typeError = false;
                msg = "RePassword và password không giống nhau";
            }
        }
    }

    res.render('user/addTaiKhoan', { msg : msg , typeError : typeError ,avatar : req.body.avatar , user_name : req.body.user_name , name : req.body.name
        ,email : req.body.email , passw : req.body.password , rePass : req.body.rePassword});
}

exports.xoaTaiKhoan = async (req, res, next) => {
    let msg = '';
    try {
        await myMD.userModel.findByIdAndDelete(req.params.idUser);
        msg = 'Xóa thành công'
        res.redirect('/user');
    } catch (error) {
        console.log(error);
    }
    res.render('user/qlTaiKhoan', { msg });
}

exports.suaTaiKhoan = async (req, res, next) => {
    let msg = '';
    
    if (req.method == 'POST') {
        let idUser = req.body.idUser;
        console.log('dd : ' + idUser);
        
        let objUser = await myMD.userModel.findById(idUser);
        objUser.avatar = req.body.avatar;
        objUser.name = req.body.name;
        objUser.email = req.body.email;
        if (req.body.role == '0') {
            objUser.role = 'User';
        } else {
            objUser.role = req.body.role;
        }
        console.log('dd : ' + objUser);
        try{
            await myMD.userModel.findByIdAndUpdate(idUser, objUser);
            res.redirect('/user');
            msg = "Sửa thể tài khoản thành công"
        }catch(error){
            console.log(error)
            msg = "Sửa thể tài khoản không thành công"
        }
    }

    res.render('user/qlTaiKhoan', { msg });
}