var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.listen(8888);

app.get('/generate', function(req, res) {
  res.render('about');
  // return "generate";
});