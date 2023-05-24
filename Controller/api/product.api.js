var mdProduct = require('../../models/product.model');
const { list } = require('./user.api');

exports.listSp = async (req, res, next)=>{

    let listSP = await mdProduct.spModel.find();

    res.status(200).json( 
        { 
            msg : 'Danh sách sản phẩm',
            data : listSP
        }  
    );
 }

exports.listLoai = async (req, res, next)=>{

    let listLoai = await mdProduct.loaiModel.find();

    res.status(200).json( 
        { 
            msg : 'Danh sách loại',
            data : listLoai
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
 