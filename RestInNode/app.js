var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bookApi');
var Book = require('./models/bookModel');

var bookrouter =  require('./Routes/bookRoutes')(Book);

var port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api/books',bookrouter);

app.get('/' , (req, res)=>{
	res.send('welcome to my API');
});

app.listen(port,()=>{
	console.log('server is running at ' + port); 
});
