Jane Kim
jk3316@columbia.edu

Forked from Charlie Robbins' twitter-no-backend repo. To run:

    Just open public/index.html in your browser (This has only been tested in Google Chrome).

      $ cd /path/to/twitter-no-backend/public
      $ open index.html

    Once your HTTP server is running you will need to pass your Twitter credentials to the client-side Javascript application.

    The following query parameters are valid:

    consumer_key
    consumer_secret
    access_token
    access_token_secret
    e.g.

    file://twitter-no-backend/public/index.html?consumer_key=YOUR_KEY&consumer_secret=YOUR_SECRET&access_token=YOUR_TOKEN&access_token_secret=YOUR_TOKEN_SECRET

    Navigating to that in your browser will demonstrate a PROOF-OF-CONCEPT basic demo using codebird-js. The code is located in /public/js/main.js.

I used Twitter Bootstrap for a clean yet interactive UI that was familiar to many people. I included a description to tell the user what to do. Each of the form fields is required so the search won't take place until the user puts something in every field.

Sometimes there is no output with certain dates in 'until' because the until parameter is specifying a date that is outside of the range the Search service is indexing.
https://dev.twitter.com/discussions/10802

The app never shows more than 15 tweets because of Twitter's rate limiting.

If I had more time, I would have formatted the drill-down information and the history. I would have also implemented some kind of input validation.