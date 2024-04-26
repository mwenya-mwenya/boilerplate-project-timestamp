// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let longDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/London',
  })
  if (!req.params.date) {
    return res.json({ "unix": Date.now(), 'utc': longDate.format(new Date.now()) });
  } else {
    let date = req.params.date
    let unixDate = Date.parse(date)
    if (!unixDate) { unixDate = parseInt(date) }
    let fDate = longDate.format(unixDate)
    let utcDate = new Date(unixDate)
    console.log(date, unixDate, utcDate)
    return res.json({ "unix": unixDate, 'utc': fDate });
  }
});



// Listen on port set in environment variable or default toLocaleString('en-US) 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
