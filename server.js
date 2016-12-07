var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router =  express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://dbaccess:dbaccess@ds119608.mlab.com:19608/heroku_n08k67hr');

var Bear = require('./app/models/bear');

router.get('/', function(req, res){
    res.json({message: 'HOLA MUNDO'});
});

router.post('/bears', function(req, res){
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err){
        if(err)
            res.send(err);
            
        res.json({message: 'Bear created'});
    });
});

router.get('/bears', function(req, res){
    Bear.find(function(err, result){
        if(err)
            res.send(err);
            
        res.json(result);
    });
});

router.get('/bears/:_id', function(req, res){
    Bear.find({_id: req.params['_id']}, function(err, result){
        if(err)
            res.send(err);
            
        res.json(result);
    });
});

router.put('/bears/:_id', function(req, res){
    Bear.update({_id: req.params['_id']}, req.body, function (err, result) {
        if (err) {
            res.send(err);
        } 
        res.json({message: 'Bear updated'});
    });
});

router.delete('/bears/:_id', function(req, res){

    Bear.remove({_id: req.params['_id']}, function (err, result) {
        if (err) {
            res.send(err);
        } 
        res.json({message: 'Bear deleted'});
    });
});

app.use('/api', router);

app.listen(port);
console.log('Magic Happens on port ' + port);