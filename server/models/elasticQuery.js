var elasticQuery = exports = module.exports = {};
var elasticsearch = require('elasticsearch');
var tweetIndex = "tweets";

elasticQuery.query = function(query) {
    var client = new elasticsearch.Client({
        host: process.env.ElasticSearch_HOST,
        log: 'trace'
    });
    return client.search({
        index: tweetIndex,
        type: 'tweet',
        body: query
    })
};



