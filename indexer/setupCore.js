// client.indices.deleteMapping([params, [callback]])
// client.indices.getMapping([params, [callback]])
// client.indices.delete([params, [callback]])
// client.indices.create([params, [callback]])
require('dotenv').load();

var client = require('./../elasticClient');

// Setup tweet Index
var tweetIndex = "tweets";

function onError(e) {
    throw e;
}

function createIndex() {
    // Create Index
    function onIndexCreated() {
        console.log("indexCreated: ", tweetIndex);
        createMappings();
    }

    client.indices.create({index: tweetIndex})
        .then(onIndexCreated)
        .catch(onError);
}

function deleteIndex() {
    function onDeleteComplete(contents) {
        console.log("Delete TweetIndex: ", tweetIndex);
        createIndex();
    }

    client.indices.delete({index: tweetIndex})
        .then(onDeleteComplete)
        .catch(onError);
}

function createMappings() {

    // Mappings
    function onMappingComplete(contents) {
        console.log("Mapping updated: ", contents);
    }

    var tweetMapping = {
        "index": tweetIndex,
        "type": 'tweet',
        ignoreConflicts: true,
        "body": {
            "tweet" : {
                "properties" : {
                    "id" : { "type" : "long" },
                    "user" : {"type" : "string"},
                    "message" : {"type" : "string" },
                    "hashTags" : {"type" : "string"},
                    "mentions" : {"type" : "string"},
                    "postDate": { "type": "date", "format": "EE MMM d HH:mm:ss Z yyyy" },
                    "timestamp" : {"type" : "long"},
                    "location" : {"type" : "long"},
                    "rank" : {"type" : "long"},
                    "retweet_count": {"type" : "long"},
                    "favorite_count": {"type" : "long"},
                    "coordinates": {"type": "geo_point", "null_value": [0,0]}
                }
            }
        }
    };


    client.indices.putMapping(tweetMapping)
        .then(onMappingComplete)
        .catch(onError);
}

// Create recreate the index if we need to;
(function() {
    // List Indexes
    // Delete Index if it exists
    function onStatsComplete(data) {
        var needsDelete = false;
        for(i in data.indices) {
            if(i === tweetIndex) {
                needsDelete = true;
                deleteIndex();
            }
        }

        if(!needsDelete) {
            createIndex();
        }
    }

    // Start the process of recreating the index
    client.indices.stats({level: 'indices'})
        .then(onStatsComplete)
        .catch(onError);
})();
