var express = require('express');
var path = requre('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /foods - returns all foods
app.get('/foods', function(req, res) {
  var foods = fs.readFileSync('/data.json');
  foods = JSON.parse(foods);
  res.json(foods);
});

app.listen(3000);
