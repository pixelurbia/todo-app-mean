var express = require('express');
var router = express.Router();

var Todo = require('../models/todo'); //call this model

router.get('/', function(req, res, next){
    Todo.find() //find all todos 
    .exec( function(err, docs){  //execute all queries at this point
            if (err) { //if errors
                return res.status(404).json({
                    title: 'An error! Ugh!',
                    error: err
                });
            } 
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.post('/', function(req, res, next){
    var todo = new Todo({
        todo: req.body.todo 
    });
    todo.save(function(err, result){
        if (err){ //can't forget errrrrrrs '
            return res.status(404).json({ //passing a json obj with res
                title: 'Another err!',
                error: err
            }); 
        }
        res.status(201).json({
            todo: 'saved!',
            obj: result
        });
    })
});


router.delete('/:id', function (req, res, next) {
    Todo.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found',
                error: {message: 'Message could not be found'}
            });
        }
        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

module.exports = router;