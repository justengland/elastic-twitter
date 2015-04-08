var elasticsearch = require('elasticsearch');
console.log(process.env.ElasticSearch_HOST)
exports = module.exports = new elasticsearch.Client({
    host: process.env.ElasticSearch_HOST,
    log: 'trace'
});