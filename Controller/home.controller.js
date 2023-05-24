var myMD = require('../models/product.model');
var myMDAcc = require('../models/user.model');

exports.index = async (req , res , next) =>{

    let coutUser = await myMD.spModel.find().count();
    let coutSP = await myMD.spModel.find().count();
    let coutTL = await myMD.loaiModel.find().count();

    console.log(coutSP + " dd " + coutTL)

    res.render('home/index', {coutSP , coutTL, coutUser});
}

exports.login = async (req , res , next) =>{
    msg = '';
    typeError = false;
    if(req.method == 'POST'){
        if(req.body.email == ''){
            typeError = true;
            msg = "Vui lòng nhập Email";
            return res.render('index/login', {msg : msg , typeError : typeError, email : req.body.email , passwd : req.body.passwd});
        }else if(req.body.passwd == ''){
            typeError = true;
            msg = "Vui lòng nhập Password";
            return res.render('index/login', {msg : msg , typeError : typeError, email : req.body.email , passwd : req.body.passwd});
        }

        try{
            let objUer = await myMDAcc.userModel.findOne({email : req.body.email});
            if(objUer != null){
                if(objUer.password == req.body.passwd){
                    typeError = false;
                    msg = "Đăng nhập thành công"
                    req.session.userLogin = objUer;
                    return res.redirect('/');
                }else{
                    typeError = true;
                    msg = "Sai mật khẩu"
                }
            }else{
                typeError = true;
                msg = "Tài khoản không tồn tại";
            }
        }catch(error){
            msg = error.message;
        }
    }
    res.render('index/login', {msg : msg , typeError : typeError , email : req.body.email , passwd : req.body.passwd});
}

exports.createAc = (req , res , next) =>{
    res.render('index/createAc');
}