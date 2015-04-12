/* Mi taxi
 * Currency model
 */

var database = require('mitaxi_mysql');

var find = function(mode, currency, next){
  database.pool.getConnection(function(err, connection) {
    var query = 'select ';
    switch(mode) {
      case 'medium':
        query += 'c.id, c.name, c.simbol from currency c where ';
        break;
      default:
        query += '* from currency c where ';
    };
    if (currency.id) {
      query +='c.id = '+ connection.escape(currency.id) +' and ';
    };
    query +=' true;';
    connection.query( query, function(err, results) {
      if (err) {
        console.log('An error ocurred in currency.find('+ JSON.stringify(currency) +')');
        console.log(err);
      };
      if (results.length == 1) {
        next(err, results[0])
      }else{
        next(err, results)
      };
      connection.release();
    });
  });
};



exports.find = find;