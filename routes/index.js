var Article = require('../models/models.js').Article;
var Collection = require('../models/models.js').Collection;

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
    res.render('new_article');
};

var post_new_article = function(req,res){
    var new_article_info = req.body;
    console.log(new_article_info);
    var new_article = new Article(new_article_info);

    Article.count({'name':new_article_info.name}, function(err, count) {
        if (!count) {
            new_article.save(function(err) {
                if (err) {
                    res.status(500).send("Something broke!");
                } else {
                    //console.log(new_article_info.collection);
                    if (new_article_info.collection){
                        Collection.findOne({name:new_article_info.collection}, function(err, collection){
                            if (err){
                                res.status(500).send("Something broke!");
                            } else {
                                if (collection) {
                                    collection.articles.push(new_article);
                                    collection.save(function (err) {
                                        if (err) {
                                            res.status(500).send("Something broke!");
                                        } 
                                        //console.log(collection);
                                    });
                                } 
                            }
                        });
                    }
                    new_article_info.error_message = ''; //no error!
                    res.send(new_article_info);
                }
            });
        } else {
            res.send({error_message: 'An article with this name exists already!' });
        }
    });
};

var search_article = function(req,res){
    var search_name = req.params['0'];
        Article.find({'name': new RegExp(search_name,'i')}, function(err, articles) {
            if (err){
                res.status(500).send("Something broke!");
            } else {
                console.log(articles);
                if (articles.length > 0){
                    var article_names = articles.map(function(article){
                        return article.name;
                    });
                    res.send({article_names: article_names});
                } else {
                    res.send({message: 'No results found!'});
                }
            }
        });
};

var search_results = function(req,res){
    var search = req.params['0'];
    console.log(search);
    res.render('search_results', {search: search} );
}

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
    console.log(req.params);
    console.log(req.params.name);
    console.log('viewing article!');
    res.render('view_article',{name: req.params.name});
};

var get_all_collection_names = function(req,res){
    console.log('request to get_all_collection_names');
    Collection.find({}, function (err, collections) {
        if (err) {
            res.status(500).send("Something broke!");
        } else {
            if (collections) {
                console.log('there are collections');
                var collection_names = collections.map( function(collection){
                    return collection.name;
                });
                console.log(collection_names);
                res.send(collection_names);
            } else {
                console.log('no collections');
                res.send({err:true, error_message:'No collections exist!'});
            }
        }
    });
}

var get_new_collection = function(req,res){
    res.render('new_collection');
};

var post_new_collection = function(req,res){
    var new_collection_info = req.body;
    //write code to prevent blank form
    var new_collection = new Collection(new_collection_info);

    Collection.count({'name':new_collection_info.name}, function(err, count) {
        if (!count) {
            new_collection.save(function(err) {
                if (err){
                    res.status(500).send("Something broke!");
                } else {
                    res.send(new_collection_info);
                }
            });
        } else {
            res.send({err: true, error_message: 'A collection with this name exists already!' });
        }
    });
};

var get_collection = function(req,res){
    if (req.params.name) {
        Collection.findOne({name: req.params.name}, function (err, collection) {
            if (err) {
                res.status(500).send("Something broke!");
            } else {
                if (collection) {
                    res.send(collection);
                } else {
                    res.send({err:true, error_message:'No collection with this name exists yet!'});
                }
            }
        });
    } else { 
        res.send('Nothing here, move along!');
    }
};

var view_collection = function(req,res){
    res.render('view_collection',{name: req.params.name});
};

module.exports.home = home;
module.exports.get_new_article = get_new_article;
module.exports.get_article = get_article;
module.exports.post_new_article = post_new_article;
module.exports.view_article = view_article;
module.exports.get_random_article = get_random_article;
module.exports.search_article = search_article;
module.exports.search_results = search_results;

module.exports.get_all_collection_names = get_all_collection_names;
module.exports.get_new_collection = get_new_collection;
module.exports.get_collection = get_collection;
module.exports.post_new_collection = post_new_collection;
module.exports.view_collection = view_collection;

