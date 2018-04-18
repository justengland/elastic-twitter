var batcher = exports = module.exports = {}

require('dotenv').load()

var client = require('../lib/elasticClient')
var twitterText = require('twitter-text')
var tweetIndex = 'twitter'

function onError (e) {
  throw e
}

batcher.batchTweets = function (tweets, onComplete) {
  var body = []

  function onBulkComplete (data) {
    console.log(`tweets batched: ${body.length}`)
  }

  tweets.forEach(function (ele) {
    // Index Meta data
    body.push({index: { _index: tweetIndex, _type: 'tweet' }})
    body.push(ele)
  })

  client.bulk({ body: body })
    .then(onBulkComplete)
    .catch(onError)
}

batcher.createIndices = function (onCreated) {
  client.indices.create({index: 'users'}, function (error, data) {
    if (error) console.warn(error)
    client.indices.create({index: 'posts'}, function (error, data) {
      if (error) console.warn(error)
      console.log('create index ---> ', data)
    })
  })

  if (onCreated) onCreated()
}

// client.bulk({
//    body: [
//        // action description
//        { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
//        // the document to index
//        { title: 'foo' },
//        // action description
//        { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
//        // the document to update
//        { doc: { title: 'foo' } },
//        // action description
//        { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
//        // no document needed for this delete
//    ]
// }, function (err, resp) {
//    // ...
// });

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

var twitter = require('twitter')
var twit = new twitter({ // eslint-disable-line new-cap
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

function mapTweet (source) {
  var result = {
    id: source.id,
    user: source.user.screen_name,
    message: source.text,
    createDate: source.created_at,
    postDate: source.created_at,
    timestamp: Number(source.timestamp_ms),
    priority: -1,
    rank: source.user.statuses_count,
    hashTags: twitterText.extractHashtags(source.text),
    mentions: twitterText.extractMentions(source.text),
    retweet: source.retweet_count,
    favorite_count: source.favorite_count
  }

  // https://github.com/elastic/elasticsearch/issues/5680
  // work around: https://gist.github.com/hkorte/9936192
  if (source.geo && source.geo.type === 'Point') {
    result.coordinates = source.geo.coordinates
  }

  return result
}

twit.stream('statuses/sample', {language: 'en'}, function (stream) {
  var tweets = []
  stream.on('data', function (data) {
    if (!data.delete) {
      // console.log("------------------------------");
      // console.log(" DATA ");
      // console.log("------------------------------");
      // console.log(JSON.stringify(data, 0, 4));
      // console.log();

      var trimmedTweet = mapTweet(data)
      // console.log(trimmedTweet);
      tweets.push(trimmedTweet)
      if (tweets.length === 50) {
        var writeTweets = clone(tweets)
        tweets = []
        batcher.batchTweets(writeTweets)
      }
    }
  })
})
