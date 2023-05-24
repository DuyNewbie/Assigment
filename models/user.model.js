var db = require('./db');

const userSchema = new db.mongoose.Schema(
    {
        avatar : {type : String , require : false},
        name : {type : String , require : true},
        user_name : {type : String , require : true},
        email : {type : String , require : true},
        role : {type : String , require : true},
        password : {type : String , require : true}
    },
    {
        collection : 'User'
    }
);
let userModel = db.mongoose.model('userModel' , userSchema);

module.exports = {userModel}