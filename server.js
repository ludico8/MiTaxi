/* Mi Taxi
 * Created by Diego Corrales
 */

// Dependencies
var express = require('express'),
  path = require('path'),
  stylus = require('stylus');
var app = express();
var landing = require('./routes/landing'),
  administration = require('./routes/administration'),
  central = require('./routes/central'),
  taxi = require('./routes/taxi'),
  client = require('./routes/client');

var nodemailer = require("nodemailer");

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
                            src: __dirname +'/public',
                            dest: __dirname +'/public',
                            compress: true
                          }));
app.use(express.static(__dirname +'/public'));
app.use(express.favicon(__dirname + '/public/images/logoTaxi!!!.png'));

//Ocupamos esto para recibir los parametros del formulario
app.use(express.urlencoded());
app.use(express.json());  

// Rutes
app.get('/', landing.index);
app.get('/central/prices', landing.getLicences);

//app.get('/central', administration.listCentrals);
app.get('/index', landing.index);
app.get('/driver', administration.driver);
app.get('/central', administration.central);

app.post('/contact', function(req, res) {
  console.log("Enviar email");  

  var mailOpts, smtpConfig, texto;

  texto = "Empresa: " + req.body.empresa + "\n" +
          "Nombre: " + req.body.nombre + "\n" +
          "Email: " + req.body.email + "\n" +
          "Teléfono: " + req.body.telefono + "\n" +
          "Detalle: " + req.body.mensaje

  smtpConfig = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: "onmotherboard@gmail.com",
      pass: "2remember"
    }
  });

  mailOpts = {
    from: req.body.nombre + ' &lt;' + req.body.email + '&gt;',
    to: ' onmotherboard@gmail.com',
    //replace it with id you want to send multiple must be separated by ,(comma)
    subject: 'Contact form',
    text: texto
  };

  //send Email
  smtpConfig.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
      console.log(error);
      //res.end("ERROR AL ENVIAR EL MENSAJE");
    }
    //email sent successfully
    else {
      console.log("EL CORREO SE HA ENVIADO CORRECTAMENTE")
      //res.end("EL CORREO SE HA ENVIADO CORRECTAMENTE");
    }
  });

});


// Server startup
app.listen(process.env.PORT || 3000, function(){
  console.log('Mi Taxi listening on port '+ (process.env.PORT || 3000));
});