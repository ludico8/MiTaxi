/* Mi taxi
 * Licence model
 */

var async = require('async');
var database = require('mitaxi_mysql');
var currency = require('./currency');
var atribute = require('./atribute');

/* Looks for licences in the DB
 * Modes: heavy
 */
var find = function(mode, licence, next){
  database.pool.getConnection(function(err, connection) {

    // Making the query
    var query = 'select ';
    switch(mode) {
      case 'heavy':
        query += 'l.id, l.name, l.price, l.currency_id, l.country_id from licence l where ';
        break;
      default:
        query += '* from licence l where ';
    };
    if (licence.country_id) {
      query +='l.country_id = '+ connection.escape(licence.country_id) +' and ';
    };
    query +=' true order by price asc;';

    // Executing the query
    connection.query( query, function(err, results) {
      if (err) {
        console.log('An error ocurred in licence.find('+ JSON.stringify(licence) +')');
        console.log(err);
      };
      if (mode == 'heavy') {

        // Geting the currency
        async.each(
          results,
          function(item, done){
            currency.find('medium', {id: item.currency_id}, function(err, currencyResults){
              if (err) {
                console.log(err);
                next(err)
              };
              item.currency = currencyResults;
              done();
            });
          },
          function(err){
            if (err) {
              console.log(err);
              next(err)
            };

            // Geting the atributes
            async.each(
              results,
              function(item, done){
                atribute.find('forLicence', {licence_id: item.id}, function(err, atributesResults){
                  if (err) {
                    console.log(err);
                    next(err)
                  };
                  item.atributes = atributesResults;
                  done();
                });
              },
              function(err){
                if (err) {
                  console.log(err);
                  next(err)
                };
                next(err, results);
              }
            );
          }
        );
      }else{
        next(err, results);
      };
      connection.release();
    });
  });
};

exports.find = find;