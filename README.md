# searchtwit
A sample search app using node, express, elastic search twitter

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Kibanna Dashboard
https://gist.github.com/cfe5c785b09543f6edca
https://elastic-twitter-2938389572-us-east-1.k4s.bonsaiapps.net

## Setup Enviroment WebServer
1. Clone or Fork from Github
1. npm install
1. setup .env file 
```
ELASTIC_HOST=https://your-elastic-server.com
TWITTER_CONSUMER_KEY=XXXXXX
TWITTER_CONSUMER_SECRET=XXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_KEY=XXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_SECRET=XXXXXXXXXXXX
```


## Start Web Server - run in one terminal
npm run dev:server

## Start Webpack - run in another terminal
npm run dev:webpack

## Start Indexer - only needed to load data
npm run elastic:index

## Recreate Elastic Index - warning deletes all data!!!!
npm run elastic:create

## Demo
https://elastic-twitter.herokuapp.com/

## Sense - Elastic Search IDE
https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig?hl=en

## Helpful Urls
http://jontai.me/blog/2013/01/advanced-scoring-in-elasticsearch/ - advanced scoring
http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html - api guide
https://www.found.no/foundation/function-scoring/ - Trending Scoring Algorithm
https://www.found.no/pricing/#pricing/availability_zones=2&capacity=1024&region=us-east-1&ssd=true Found.no is owned by elastic, but its pricey
http://www.elastic.co/guide/en/elasticsearch/guide/master/decay-functions.html - More Algorithm
http://www.elastic.co/guide/en/elasticsearch/guide/master/boosting-by-popularity.html
https://bonsai.io/ - Free elastic hosting
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html - Docker local for Elastic

## Elastic URLS
List indies: https://your-elastic-server.com/_cat/indices?v
basic query: https://your-elastic-server.com/twitter/_search?q=*