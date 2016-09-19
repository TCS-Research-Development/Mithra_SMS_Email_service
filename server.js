var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.urlencoded({limit: '5mb'}));

// parse application/json
app.use(bodyParser.json())



var smtpTransporter = nodemailer.createTransport(smtpTransport({
    service:'gmail',
    auth: {
        user: 'kmithra.kalaiselvan@gmail.com',
        pass: 'mithracks'
    }
}));


app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + 'public/index.html'));
})



app.post('/send',function(req,res){
	var mailOptions = req.body;
smtpTransporter.sendMail(mailOptions, function(error, response){
   if(error){
         console.log(error);
         res.send("error");
   }
   else{
            res.send("sent");
        }
});
});

app.listen(3000);
console.log('magic happens at port no 3000');