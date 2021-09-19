var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        allowNUll:false
    },
    userID:{
        type:String,
        require:true,
        unique:true,
        allowNull:false
    },
    password:{
        type:String,
        require:true,
        allowNull:false
    }
})

var Contact = mongoose.model('contact',contactSchema);

module.exports = Contact;