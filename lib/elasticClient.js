var elasticsearch = require('elasticsearch')
console.log('ELASTIC_HOST:', process.env.ELASTIC_HOST)
exports = module.exports = new elasticsearch.Client({
    host: process.env.ELASTIC_HOST,
    log: process.env.NODE_ENV !== 'production' && 'trace'
});

exports.TWITTER_INDEX = 'twitter'
exports.TWEET_TYPE = 'tweet'