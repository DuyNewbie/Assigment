var db = require('./db');

const spSchema = new db.mongoose.Schema(
    {
        avatar : {type : String , require : true},
        name : {type : String , require : true},
        price : {type : Number , require : true},
        description : {type : String , require : false},
        id_category : {type : db.mongoose.Schema.Types.ObjectId , ref : 'loaiModel'}  
    },
    {
        collection : 'Product'
    }
);
let spModel = db.mongoose.model('spModel' , spSchema);

//

const loaiSchema = new db.mongoose.Schema(
    {
        name : {type : String , require : true},
    },
    {
        collection : 'Category'
    }
);
let loaiModel = db.mongoose.model('loaiModel' , loaiSchema);



module.exports = {spModel,loaiModel}