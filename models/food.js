var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = Schema({
  food: String,
  color: String
});

var Food = mongoose.model('Food', foodSchema);

module.exports = Food;
