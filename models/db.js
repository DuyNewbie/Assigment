const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nbduy4606:yaWcFj9ItDje6sNC@quanlyduan.rvi6loa.mongodb.net/testDB?retryWrites=true&w=majority')
        .catch((err) =>{
            console.log("Loi ket noi CSDL");
            console.log(err);
        });

module.exports= {mongoose}