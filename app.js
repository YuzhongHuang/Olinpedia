var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index.js')
var session = require('express-session');

var app = express();

//Set up mongolab and PORTS to work locally and on heroku
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.home);
app.get('/random_article', index.get_random_article);
app.get('/get_article/:name', index.get_article);
app.get('/view_article/:name', index.view_article);
app.get('/new_article', index.get_new_article);
app.post('/new_article', index.post_new_article);
app.post('/edit_article', index.post_edit_article);
app.post('/search_article', index.post_search_article);
app.get('/get_all_collection_names', index.get_all_collection_names);
app.get('/get_collection/:name', index.get_collection);
app.get('/view_collection/:name', index.view_collection);
app.get('/new_collection', index.get_new_collection);
app.post('/new_collection', index.post_new_collection);

app.listen(PORT, function(){
    console.log("Application running on port:", PORT);
});
