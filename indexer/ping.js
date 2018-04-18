require('dotenv').load()

const client = require('../lib/elasticClient')
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!')
  } else {
    console.log('All is well')
  }
})
