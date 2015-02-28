var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    name: String,
    description: String,
    //String is just a placeholder b/c we don't know how to store images
    image: String
});

var articleCollectionSchema = mongoose.Schema({
    name: String,
    articles: [articleSchema]
});

article_model = mongoose.model('Article', articleSchema);
article_collection_model = mongoose.model('Article_collection', articleCollectionSchema);

module.exports.Article = article_model;
module.exports.Collection = article_collection_model;
