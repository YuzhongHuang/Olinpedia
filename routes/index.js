var Article = require('../models/models.js').Article;

var home = function(req,res){ //get a random article
    Article.count().exec(function(err, count){
        var random = Math.floor(Math.random() * count);
        Article.findOne().skip(random).exec(
            function (err, article) {
                if (err) {
                    res.status(500).send("Something broke!");
                } else {
                    if (article) {
                        res.render('home', article);
                    } else {
                        res.send("Couldn't find any articles!");
                }
            }
        });
    });
};

var get_new_article = function(req,res){
    console.log('hallo');
    res.render('new_article');
};

var post_new_article = function(req,res){
    res.render('new_article');
};

var view_article = function(req,res){
    console.log('hallo');
    if (req.params.name) {
        Article.findOne({name: req.params.name}, function (err, article) {
            if (err) {
                res.status(500).send("Something broke!");
            } else {
                if (article) {
                    res.render('view_article', article);
                } else {
                    res.send('Could not find article with specified name!');
                }
            }
        });
    } else { 
        res.send('Nothing here, move on!');
    }
};


module.exports.home = home;
module.exports.get_new_article = get_new_article;
module.exports.post_new_article = post_new_article;
module.exports.view_article = view_article;
