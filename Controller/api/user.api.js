var mdUser = require('../../models/user.model');

exports.list = async (req, res, next)=>{

    let listUser = await mdUser.userModel.find();

    res.status(200).json( 
        { 
            msg : 'Danh sách tài khoản',
            data : listUser
        }  
    );
 }
 
 
 exports.add = (req, res, next)=>{
 
    res.status(201).json( { msg: 'Thêm mới'}  );
 }
 
 
 exports.edit = (req, res, next)=>{
 
 
    res.status(200).json( { msg: 'Sửa'}  );
 }
 
 
 exports.delete = (req, res, next)=>{
   
    res.status(200).json( { msg: 'Xóa'}  );
 }
 