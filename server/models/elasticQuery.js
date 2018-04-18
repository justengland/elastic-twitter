const elasticQuery = exports = module.exports = {}
const client = require('../../lib/elasticClient')
const {TWITTER_INDEX, TWEET_TYPE} = require('../../lib/elasticClient')

elasticQuery.query = function (query) {
  return client.search({
    index: TWITTER_INDEX,
    type: TWEET_TYPE,
    body: query
  })
}
