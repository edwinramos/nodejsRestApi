var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router =  express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://dbaccess:dbaccess@ds119608.mlab.com:19608/heroku_n08k67hr');

var Contact = require('./app/models/contact');

router.get('/', function(req, res){
    res.json({message: 'HOLA MUNDO'});
});

router.post('/contacts', function(req, res){
    var contact = new Contact();
    contact.name = req.body.Name;
    contact.lastName = req.body.LastName;

    contact.save(function(err){
        if(err)
            res.send(err);
            
        res.json({message: 'Contact created'});
    });
});

router.get('/contacts', function(req, res){
    Contact.find(function(err, result){
        if(err)
            res.send(err);
            
        res.json(result);
    });
});

router.get('/contacts/:_id', function(req, res){
    Contact.find({_id: req.params['_id']}, function(err, result){
        if(err)
            res.send(err);
            
        res.json(result);
    });
});

router.put('/contacts/:_id', function(req, res){
    Contact.update({_id: req.params['_id']}, req.body, function (err, result) {
        if (err) {
            res.send(err);
        } 
        res.json({message: 'Contact updated'});
    });
});

router.delete('/contacts/:_id', function(req, res){

    Contact.remove({_id: req.params['_id']}, function (err, result) {
        if (err) {
            res.send(err);
        } 
        res.json({message: 'Contact deleted'});
    });
});

app.use('/api', router);

app.listen(port);
console.log('Magic Happens on port ' + port);