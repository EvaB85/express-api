var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.send('This is the root')
});

// GET /foods - returns all foods
app.get('/foods', function(req, res) {
  var foods = fs.readFileSync('./data.json');
  foods = JSON.parse(foods);
  res.render('foods', {foods: foods})
});

// POST /foods - adds a new food
app.post('/foods', function(req, res) {
  var foods = fs.readFileSync('./data.json');
  foods = JSON.parse(foods);
  foods.push({foods: req.body.foods, color: req.body.color});
  fs.writeFileSync('./data.json', JSON.stringify(foods));
  res.json(foods);
  console.log(req.body)
});

//GET /foods/:id - gets one food
app.get('/foods/:id', function(req, res) {
  var foods = fs.readFileSync('./data.json');
  foods = JSON.parse(foods);
  var foodIndex=req.params.id;
  if(foodIndex >= foods.length) {
    res.send("That is not a food");
  } else {
    res.render('show', {food: foods[foodIndex]})
  }
});

//PUT /foods/:id - updates one food
app.post('/foods/new', function(req, res) {
  var foods = fs.readFileSync('./data.json');
  foods = JSON.parse(foods);
  foods.push({name: req.body.name, color: req.body.color});
  fs.writeFileSync('./data.json', JSON.stringify(foods));
  res.redirect('/foods');
});

//DELETE /foods/:id - deletes one food
app.delete(app.de '/foods/:id', function(req, res) {
  var foodsToDelete = req.params.name;
  res.send({message: 'you did it!'});
});


app.listen(3000);



// GET /foods
// POST /foods
// GET /foods/:id
// PUT /foods/:id
// DELETE /foods/:id
