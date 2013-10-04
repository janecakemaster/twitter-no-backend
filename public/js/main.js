$(function () {

  //initializing variables
  var history = []; //stores array of last 10 lookups
  var formdata, keywords, place, sinced, untild, query, results;

  var matchers = [
  'consumer_key',
  'consumer_secret',
  'access_token',
  'access_token_secret'
  ].map(function (name) {
    return new RegExp('^(' + name + ')=([\\w-]+)$')
  });

  var values = window.location.search.slice(1).split('&')
  .reduce(function (all, value) {
    matchers.forEach(function (re) {
      var match
      if ((match = re.exec(value))) {
        all[match[1]] = match[2];
      }
    });

    return all;
  }, {});

  var client = new Codebird;
  client.setConsumerKey(values.consumer_key, values.consumer_secret);
  client.setToken(values.access_token, values.access_token_secret);

  // getting data from form
  $("form").submit(function(event) {
    $('.tweets').html('');
    formdata = $(this).serializeArray();
    if(history.length =10){
      history.shift(); // FIFO management of history array
    }
    history.push(JSON.stringify(formdata) + "<br><br>");
    $('div.history').html(history);
    keywords = formdata[0].value;
    place = formdata[1].value;
    sinced = formdata[2].value;
    untild = formdata[3].value;
    query = keywords + " place:" + place;
    getResults(query, sinced, untild);
    event.preventDefault();
  });
  var getResults = function(){
    $('.progress').html('<h3>Requesting tweets...</h3>');
    client.__call(
      "search_tweets",
      {
        q: query,
        since_id: sinced,
        until: untild
      },
      function (reply) {
        results = reply;
        var len = results.statuses.length;
        var i, j, leftover;
        for(i = 0; i < len; i++){
          var tweet = "<div class=\"accordion\" id=\"accordion2\"><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#collapse"
          + i + "\">"
          + results.statuses[i].text
          + "</a></div><div id=\"collapse" + i + "\" class=\"accordion-body collapse\"><div class=\"accordion-inner\"><pre><code>"
          + JSON.stringify(results.statuses[i], null, 2)
          + "</code></pre></div></div></div>";
          $('.tweets').append(tweet);
          if(i===49){
            i = len;
          }
        }
        var overflow;
        for(j = i; j < len; j++){
          overflow += JSON.stringify(results.statuses[i], null, 2);
          $('#more').append(tweet);
        }
      }
      );

};
});