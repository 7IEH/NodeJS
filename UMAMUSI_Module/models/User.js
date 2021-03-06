// model_users

var mongoose = require('mongoose');

//schema
var userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required!'],
        unique:true
    },
    userid:{
        type:String,
        required:[true,'UserID is required!'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required!'],
        select:false
    }
},{
    toObject:{virtuals:true}
});

//virtual : unnecessaryparameter
userSchema.virtual('passwordConfirmation')
    .get(function(){ return this._passwordConfirmation; })
    .set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
    .get(function(){ return this._originalPassword; })
    .set(function(value){ this._originalPassword=value; });

userSchema.virtual('currentPassword')
    .get(function(){ return this._currentPassword; })
    .set(function(value){ this._currentPassword=value; });

userSchema.virtual('newPassword')
    .get(function(){ return this._newPassword; })
    .set(function(value){ this.__newPassword=value; });

//password validation
userSchema.path('password').validate(function(v) {
    var user = this;

    //create user
    if(user.isNew){
        if(!user.passwordConfirmation){
            user.invalidate('passwordConfirmation', 'passwrod confirmation is required. ');
        }

        if(user.password !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not required!');
        }
    }

    if(!user.isNew){
        if(!user.currentPassword){
            user.invalidate('currentPassword', 'Current Password is required!');
        }
        else if(user.currentPassword != user.originalPassword){
            user.invalidate('currentPassword', 'Current Password is invalid!');
        }

        if(user.newPassword !== user.passwordConfirmation){
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
});

//model & export
var User = mongoose.model('user',userSchema);
module.exports = User;