'use strict';

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/missing', function(request, response) {

  const Images = require(__dirname + '/src/images');
  const Image = require(__dirname + '/src/image');

  response.render('pages/index', { images: new Images(), Image: Image });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});