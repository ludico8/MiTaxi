/* Mi taxi
 * Atribute model
 */

var database = require('mitaxi_mysql');

/* Look for atributes at the DB.
 * Modes: light, forLicence, byCountry
 */
var find = function(mode, atribute, next){
  database.pool.getConnection(function(err, connection) {
    var query = 'select ';
    switch(mode) {
      case 'ligth':
        query += 'a.id, a.name from atribute a where ';
        break;
      case 'forLicence':
        query += 'a.id, a.name, la.ammount from atribute a join licence_atributes la on la.atribute_id = a.id where ';
        break;
      default:
        query += '* from atribute a where ';
    };
    if (atribute.id) {
      query +='a.id = '+ connection.escape(atribute.id) +' and ';
    };
    if (atribute.licence_id) {
      query +='la.licence_id = '+ connection.escape(atribute.licence_id) +' and ';
    };
    query +=' true;';
    connection.query( query, function(err, results) {
      if (err) {
        console.log('An error ocurred in atribute.find('+ JSON.stringify(atribute) +')');
        console.log(err);
      };
      next(err, results)
      connection.release();
    });
  });
};

exports.find = find;