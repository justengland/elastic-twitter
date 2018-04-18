// Create the index, caution it this will remove all data.
require('dotenv').load()

const client = require('../lib/elasticClient')
const {TWITTER_INDEX, TWEET_TYPE} = require('../lib/elasticClient')
const INDEX = {index: TWITTER_INDEX}

// Delete index
client.indices.delete(INDEX, (deleteError, response) => {
  if (deleteError) console.warn('Delete Index Error:', deleteError)
  console.log('Delete Index:', response)

  // Create New Index
  client.indices.create(INDEX, (error, response) => {
    if (error) throw error

    console.log('response:', response)

    const mappingParameters = {
      ...INDEX,
      type: TWEET_TYPE,
      body: {
        properties: {
          id: {'type': 'long'},
          user: {'type': 'text'},
          message: {'type': 'text'},
          hashTags: {'type': 'text'},
          mentions: {'type': 'text'},
          postDate: {'type': 'date', 'format': 'EE MMM d HH:mm:ss Z yyyy'},
          timestamp: {'type': 'long'},
          location: {'type': 'long'},
          rank: {'type': 'long'},
          retweet_count: {'type': 'long'},
          favorite_count: {'type': 'long'},
          coordinates: {'type': 'geo_point'}
        }
      }
    }

    client.indices.putMapping(mappingParameters, (mappingError, mappingResponse) => {
      if (mappingError) throw mappingError

      console.log('mappingResponse:', mappingResponse)
    })
  })
})
