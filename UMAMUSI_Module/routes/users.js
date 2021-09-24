//routes/users.js

var express = require('express');
var router = express.Router();
var User = require('../model');


//Index
router.get('/',function(req, res){
    User.find({})
        .sort({userName:1})
        .exec(function(err, users){
            if(err) return res.json(err);
            res.render('users/index', {users:users});
        });
});

//New
router.get('/new',function(req, res){
    res.render('users/new');
});

//Create
router.post('/',function(req,res){
    User.create(req.body, function(err, user){
        if(err) return res.json(err);
        res.redirect('/users');
    })
}
)
//Show
router.get('/:userName', function(req,res){
    User.findOne({userName:req.params.userName}, function(err,user){
        if(err) return res.json(err);
        res.render('users/show', {user:user});
    });
});

//Edit
router.get('/:userName/edit', function(req, res){
    User.findOne({userName:req.params.userName}, function(err, user){
      if(err) return res.json(err);
      res.render('users/edit', {user:user});
    });
  });

//Update
router.put('/:userName', function(req, res, next){
    User.findOne({userName:req.params.userName})
      .select('password')
      .exec(function(err, user){
        if(err) return res.json(err);
  
        // update user object
        user.originalPassword = user.password;
        user.password = req.body.newPassword? req.body.newPassword : user.password;
        for(var p in req.body){
          user[p] = req.body[p];
        }
  
        // save updated user
        user.save(function(err, user){
          if(err) return res.json(err);
          res.redirect('/users/'+user.username);
        });
    });
  });
  
//Destroy
router.delete('/:userName', function(req, res){
    User.deleteOne({userName:req.params.userName}, function(err){
      if(err) return res.json(err);
      res.redirect('/users');
    });
  });

module.exports = router;