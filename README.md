# searchtwit
A sample search app using node, express, elastic search twitter

## Kibanna Dashboard
https://gist.github.com/cfe5c785b09543f6edca

## Setup Enviroment WebServer
1. Clone or Fork from Github
1. npm install
1. setup .env file ElasticSearch_HOST=https://your-elastic-server.com

## Start Web Server
npm start

## Start Indexer
node ./indexer/feeder.js

## Recreate Elastic Index - warning deletes all data!!!!
node ./indexer/setupCore.js

## Sense - Elastic Search IDE
https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig?hl=en

## Helpful Urls
http://jontai.me/blog/2013/01/advanced-scoring-in-elasticsearch/ - advanced scoring
http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html - api guide
https://www.found.no/foundation/function-scoring/ - Trending Scoring Algorithm
https://www.found.no/pricing/#pricing/availability_zones=2&capacity=1024&region=us-east-1&ssd=true Found.no is owned by elastic, but its pricey
http://www.elastic.co/guide/en/elasticsearch/guide/master/decay-functions.html - More Algorithm
http://www.elastic.co/guide/en/elasticsearch/guide/master/boosting-by-popularity.html