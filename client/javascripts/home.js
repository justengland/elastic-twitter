// Setup Handlers
$(".panel-heading").click(function() {
    $(this).closest(".panel").toggleClass( "collapsed" );
});

$("#run").click(function() {
    var code = editor.getSession().getValue();
    home.load(code);
});

$(".queryItem").click(function(event) {
    var $item = $(this);

    $item.parents("ul").find('.selected').removeClass("selected");
    $item.addClass("selected");
    event.preventDefault();

    $.get( $item.attr("href"))
        .done(function(data) {
            var selectedText = $("#jsonFileList").find(".selected").text();
            $("#dropdownMenu1 .text").text(selectedText);
            editor.setValue(JSON.stringify(data, 0, 4));
        })
        .fail(function(e) {
            console.warn("Error downloading file: ", e);
            alert( "error" );
        });
});



var home = (function() {
    var homeClass = {};

    function onFail(e) {
        $("#results").empty();

        var template = document.querySelector('#errorResult').content.cloneNode(true);
        template.querySelector('.message').textContent = JSON.stringify(e, 0, 4);

        var clone = document.importNode(template, true);
        document.querySelector("#results").appendChild(clone);

        console.warn("Ajax Error: ", e);
    }

    function onResultsComplete(data) {
        $("#results").empty();
        console.log("Good Result: ", data);
        data.hits.hits.forEach(function(hit, i) {
            tempateHit(hit);
        });
    }

    function handleErrorResult(data) {
        console.warn("Ajax Response Error: ", data);

    }

    function displayArray(arrayType, symbol, arr) {
        if(arr && arr.length > 0) {
            return arrayType + ": " + symbol + arr.join(',' + symbol);
        }
    }

    function tempateQuery(data) {
        var template = document.querySelector('#queryResult').content.cloneNode(true);
        template.querySelector('.user').textContent = "@" + hit._source.user;
        template.querySelector('.message').textContent = hit._source.message;
        template.querySelector('.tags').textContent = displayArray("hashTags",  "#", hit._source.hashTags);
        template.querySelector('.mentions').textContent = displayArray("mentions",  "@", hit._source.mentions);
        template.querySelector('.score').textContent = "score: " + hit._score;

        var clone = document.importNode(template, true);
        document.querySelector("#results").appendChild(clone);
    }

    function tempateHit(hit) {
        var template = document.querySelector('#searchResult').content.cloneNode(true);
        template.querySelector('.user').textContent = "@" + hit._source.user;
        template.querySelector('.id').textContent = "user id: " + hit._source.id;
        template.querySelector('.message').textContent = hit._source.message + " userid: " + hit._source.id;
        template.querySelector('.tags').textContent = displayArray("hashTags",  "#", hit._source.hashTags);
        template.querySelector('.mentions').textContent = displayArray("mentions",  "@", hit._source.mentions);
        template.querySelector('.score').textContent = "score: " + hit._score;
        template.querySelector('.coordinates').textContent = displayArray("hashTags",  " ", hit._source.coordinates);

        template.querySelector('.retweet').textContent = hit._source.retweet;
        template.querySelector('.rank').textContent = hit._source.rank;
        template.querySelector('.favorite').textContent = hit._source.favorite_count;


        if(hit.sort && hit.sort.length && hit.sort.length >= 0) {
            template.querySelector('.sort').textContent = "sort: " + hit.sort[0];
        }


        var clone = document.importNode(template, true);
        document.querySelector("#results").appendChild(clone);
    }

    homeClass.load = function(source) {

        var data = JSON.parse(source);

        console.log("request size: ", source.length);

        $.ajax ({
            type: 'POST',
            contentType: 'application/json',
            url: '/ajax/run-query',
            dataType: 'json',
            data: source
        })
        .done(onResultsComplete)
        .fail(onFail);


    };

    return homeClass;

})();

// Setup Ace Editor
var editor = ace.edit(document.getElementById("query"));
editor.setTheme("ace/theme/idle_fingers");
editor.getSession().setMode("ace/mode/json");

