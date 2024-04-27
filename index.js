// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;

  if (dateString === undefined) {                                       /* tests for empty date */
    return res.json({ 'unix': Date.now(), utc: new Date(Date.now()) })
  } else {
    if (new Date(dateString).toUTCString() !== 'Invalid Date') {            /* tests dateString if it can parsed by new Date() */
      console.log(new Date(dateString))
      return res.json({ 'unix': new Date(dateString).getTime(), utc: new Date(dateString).toUTCString() })
    } else {
      let dateParse = Date.parse(dateString)                                     /* if dateString can be Date parsed - this creates unix timestamp */
      let isValid = (dateParse >= -8.64e12 && dateParse <= +8.64e12) /* tests if unix timestamp is within allowable ranges */
      if (isValid) {
        return res.json({ 'unix': new Date(dateParse).getTime(), utc: new Date(dateParse).toUTCString() })
      } else {
        let dateParseInt = parseInt(dateString)  /* if dataString is a string unix timestamp  - this turns into a number */
        let isValid = (dateParseInt >= -8.64e12 && dateParseInt <= +8.64e12) /* tests if unix timestamp is within allowable ranges */
        if (isValid && !isNaN(dateParseInt)) {  /* !isNaN(dateParseInt) test for any other dateString combination that are not valid */

          return res.json({ 'unix': new Date(dateParseInt).getTime(), utc: new Date(dateParseInt).toUTCString() })
        }

      }
    }

    return res.json({ error: "Invalid Date" })
  }

});

// Listen on port set in environment variable or default toLocaleString('en-US) 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

