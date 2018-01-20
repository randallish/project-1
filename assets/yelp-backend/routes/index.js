var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/yelp', function(req, res, next) {
  console.log('hitting post url');
  var location = req.query.location;

  var yelpURL = 'https://api.yelp.com/v3/businesses/search?location='+location;
  console.log('this is our URL: ' + yelpURL);

  var optionsObj = {
    url: yelpURL,
    headers: {
      'Authorization': 'Bearer ' + process.env.YELP_API_KEY
    }
  }
  console.log(optionsObj);
  request(optionsObj, function(error, response, body){
    if (!error){
      console.log(response.body);
      res.send(response.body);
    } else {
      console.log(error);
      res.send(error);
    }
  })

});

module.exports = router;
