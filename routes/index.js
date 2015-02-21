//var User = require('../models/user_model.js').user;

var home = function(req,res){
};

var get_new_article = function(req,res){
    console.log('hallo');
    res.render('new_article');
};

var post_new_article = function(req,res){
    res.render('new_article');
};

var get_article = function(req,res){
};


module.exports.home = home;
module.exports.get_new_article = get_new_article;
module.exports.post_new_article = post_new_article;
module.exports.get_article = get_article;
