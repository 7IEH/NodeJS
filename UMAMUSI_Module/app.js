//app.js...

var express = require('express');
var mongoose = require('mongoose');
const methodOverride = require('method-override');

var app = express();

// DB Setting
mongoose.connect('mongodb+srv://7IEH:abcd1234@cluster0.e1tgp.mongodb.net/Cluster0?retryWrites=true&w=majority',{useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
});
db.on('error',function(err){
    console.log('DB ERROR : ',err);
});

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// Other Setting
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Port Setting
const port = 7000;
app.listen(port,function(){
console.log('server on! http://localhost : '+port)
})