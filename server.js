var express = require('express');
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

// set port
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.get("/", function(req, res) {
	res.render("index");
})

app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'xxx',
      pass: 'xxx'
    }
  });

  let mailOptions = {
    from: '"Clirror Black Mailer" xxx', // sender address
    to: 'xxx', // list of receivers
    subject: 'Client Form Submission', // Subject line
    text: req.body.name + '\n' + req.body.email + '\n\n' + req.body.message, // plain text body
    html: req.body.name + '<br>' + req.body.email + '<br><br>' + req.body.message // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
      res.redirect('/');
  });
});

app.listen(port, function(req, res) {
	console.log('Server is running at port: ', port);
})
