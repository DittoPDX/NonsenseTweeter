/*
SAM YOUNG
CS 290
 * Write your Express server in this file as described in README.md.
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var twitData = require('./twitData');
var app = express();
var port = process.env.PORT || 3000;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next) {


		var templateArgs = {
			twit: twitData,
      showModal: true,
		};
		res.render('twitPage', templateArgs);

});

app.get('/twits/:index',function(req,res,next){
	console.log("==url params for req:",req.params);
	var index = req.params.index;
	var data = twitData[index];
	if(data){
		var templateArgs={
			twit: [twitData[index]],
      showModal: false,
		}
	res.render('twitPage',templateArgs);
	}else{
		next();
	}
});

app.use(express.static('public'));
app.get('*', function(req, res){
	res.status(404).render('404Page');
});
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
