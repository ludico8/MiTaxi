/* Mi taxi
 * Landing pages routes
 */

var licence = require('./../models/licence');

exports.index = function(req, res){
  console.log('Diego-->Trying to getting the index.');	
  res.render('shared/singlepage');
  console.log('Diego-->Successfully get the index.');	
};

exports.getLicences = function(req, res){
  licence.find('heavy', {country_id: req.query.country_id}, function(err, result){
    if (err) {
      res.send(err);  
    }else{
      res.send(result);
    };
  });  
};