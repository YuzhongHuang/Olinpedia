var Article = require('../models/models.js').Article;

var home = function(req,res){ 
    res.render('home');
};

var get_random_article = function(req,res){
    console.log('hello!');
    Article.count().exec(function(err, count){
        var random = Math.floor(Math.random() * count);
        Article.findOne().skip(random).exec(
            function (err, article) {
                if (err) {
                    res.status(500).send("Something broke!");
                } else {
                    if (article) {
                        console.log(article);
                        console.log('hello!');
                        res.send(article);
                    } else {
                        res.send("Couldn't find any articles!");
                }
            }
        });
    });
}

var get_new_article = function(req,res){
    console.log('hallo');
    res.render('new_article');
};

var post_new_article = function(req,res){
    var new_article_info = req.body;
    //write code to prevent blank form
    var new_article = new Article(new_article_info);

    Article.count({'name':new_article_info.name}, function(err, count) {
        if (!count) {
            new_article.save(function(err) {
                if (err) console.error(err);
                res.json(new_article_info);
            });
        } else {
            res.send({err: true, err_msg: 'An article with this name exists already!' });
        }
    });
};

var post_search_article = function(req,res){
    var search_article_info = req.body;
    if (!search_article_info.name){
        
    } else {
        Article.count({'name':search_article_info.name}, function(err, count) {
            if (!count) {
                    res.send({err: true, err_msg: 'There is no article about ' +  search_article_info.name + '. Go ahead and create one!'});
            } else {
                res.json(search_article_info);
            }
        });
    }
};

var get_article = function(req,res){
    if (req.params.name) {
        Article.findOne({name: req.params.name}, function (err, article) {
            if (err) {
                res.status(500).send("Something broke!");
            } else {
                if (article) {
                    res.send(article);
                } else {
                    res.send({err:true, error_message:'No article with this name exists yet!'});
                }
            }
        });
    } else { 
        res.send('Nothing here, move along!');
    }
};

var view_article = function(req,res){
    console.log(req.params.name);
    res.render('view_article',{name: req.params.name});
    /*
    console.log('hallo');
    if (req.params.name) {
        Article.findOne({name: req.params.name}, function (err, article) {
            if (err) {
                res.status(500).send("Something broke!");
            } else {
                if (article) {
                    res.render('view_article', article);
                } else {
                    var new_article = new Article({
                        name:req.params.name,
                        description:"Nothing to see here! Why don't you edit this page and add something?",
                        image:''
                    });
                    new_article.save(function(err){
                        if (err) console.error(err);
                        res.render('view_article', new_article);
                    })
                }
            }
        });
    } else { 
        res.send('Nothing here, move along!');
    } */
};


module.exports.home = home;
module.exports.get_new_article = get_new_article;
module.exports.get_article = get_article;
module.exports.post_new_article = post_new_article;
module.exports.view_article = view_article;
module.exports.get_random_article = get_random_article;
module.exports.post_search_article = post_search_article;