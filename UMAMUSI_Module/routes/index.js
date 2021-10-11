// routes/index.js

var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/',function(req,res){
    res.render('home/main');
});
router.get('/about',function(req,res){
    res.render('home/about');
});
router.get('/new',function(req,res){
    res.render('home/new');
});


module.exports = router;
