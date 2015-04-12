/* My Taxi
 * Created by Diego Corrales
 */

var database = require('mitaxi_mysql');

exports.index = function(req, res){
  res.render('shared/singlepage');  
};

exports.listCentrals = function(req, res){
  database.pool.getConnection(function(err, connection) {
    connection.query( 'SELECT c.id, c.name FROM central c ORDER BY c.name', function(err, rows) {
      if (err) {
        console.log('An error ocurred in administration.listCentrals.');
        console.log(err);
      };
      res.send( {centrals: rows} );
      connection.release();
    });
  });
};

 exports.driver = function(req, res){
   //res.render('driver');  
   res.render('shared/singlepage');
 };

 exports.central = function(req, res){
   //   res.render('central');  
   res.render('shared/singlepage');
 };