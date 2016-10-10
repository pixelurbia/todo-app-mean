var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var Todo = mongoose.model('Todo', {text : String});
var schema = new Schema({
    todo: {type: String} 
});



module.exports = mongoose.model('Todo', schema);


