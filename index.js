var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var Food = require('./models/food');
mongoose.connect('mongodb://localhost/express_api');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// GET /foods - returns all foods
app.get('/foods', function(req, res) {
  console.log('first foods get route')
  Food.find({}, function(err, foods) {
    res.render('foods/index', {foods: foods});
  })
});

// GET /foods/new - returns the form for adding (CREATE)
  app.get('/foods/new', function(req, res) {
  res.render('foods/new');
});

// POST /foods - ADDS ONE new food
app.post('/foods', function(req, res) {
  console.log('post foods route')
  Food.create({food: req.body.foods, color: req.body.color}, function(err, food) {
  });
  res.redirect('/foods');
});

//GET /foods/:id - GETS ONE food
app.get('/foods/:id', function(req, res) {
  Food.findOne({_id: req.params.id}, function(err, food) {
    res.render('foods/show', {food: food});
  })
});

// GET/foods/EDIT - returns the form for UPDATING
app.get('/foods/:id/edit', function(req, res){
  var foods = fs.readFileSync('./data.json');
  foods = JSON.parse(foods);
  res.render('foods/edit', {foods: foods[req.params.id], id: req.params.id});
})

//PUT /foods/:id - UPDATES ONE food
app.put('/foods/new', function(req, res) {
  console.log('foods/new post hit')
var foods = fs.readFileSync('./data.json');
foods = JSON.parse(foods);
foods[req.params.id].foods = req.body.foods;
foods[req.params.id].color = req.body.color;
fs.writeFileSync('./data.json', JSON.stringify(foods));
res.json('/foods');
});

//DELETE /foods/:id - DELETES ONE food
app.delete('/foods/:id', function(req, res) {
  Food.remove({_id: req.params.id}, function(err) {
    console.log(err);
  })
  res.sendStatus(200);
});


app.listen(3000);



 //render with ejs one file or ...
 //json with a stringify ..object data or api result
