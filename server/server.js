const express = require('express');
const bodyParser = require('body-parser');
const Flickr = require('flickr-sdk');

const app = express();
const PORT = process.env.PORT || 3005;
const path = require('path');

const FLICKR_API_KEY = '0c5bd959ac8c825db5c9e07adaaa147c';
const FLICKR_API_SECRET = '5a2cf712825ca8fe';

const flickr = new Flickr(FLICKR_API_KEY);

// app.use(express.static('public'));

app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/photos', (req, res) => {
  const {text = '', type = 'recent', page = 0, maxDate} = req.query;

  function returnResult(data) {
    res.send(data);
  }

  switch (type) {
    case "recent":
      flickr.photos.getRecent({per_page: 16, page, extras: 'tags,description'})
        .then(function (result) {
          returnResult(result.body);
        }).catch(function (err) {
        console.error('error: ', err);
      });
      break;
    case "search":
      flickr.photos.search({text, per_page: 16, page, extras: 'tags,description', max_upload_date: maxDate})
        .then(function (result) {
          returnResult(result.body);
        }).catch(function (err) {
        console.error('error: ', err);
      });
      break;
    default:
      console.error('Type not defined')

  }

  // flickr.photos.getRecent({per_page: 10, page})
  //   .then(function (result) {
  //     // res.setHeader('Content-Type', 'application/json');
  //     // res.send(JSON.stringify({ response: res.body }));
  //     returnResult(result.body);
  //
  //     console.log('success');
  //   }).catch(function (err) {
  //   console.error('error: ', err);
  // });
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started on port ' + PORT);
});





