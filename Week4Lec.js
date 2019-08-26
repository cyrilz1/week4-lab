let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let ejs = require('ejs'); //Allows us to inject javascript into a html

app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

db = []

app.use(express.static("public"));
app.use(express.static("images"));

app.use(function(req,res,next){
    console.log("Middleware.....1");
    next();
});

// parse application/json
app.use(bodyParser.json());

//
// app.get('/',function(req,res){
//     console.log("Hello from app.get");
//     res.send('hello');
//     });
//

app.get('/', function(req,res){
    console.log("I got a GET request");
    //res.send("Thank you for your response");
    //res.sendFile( __dirname + "/indexLab.html");
    res.render('indexLab.html', {userName: "Tim", ar: db})
});

app.post('/data',function(req,res){
    console.log("I got a post request");
    console.log(req.body);
    db.push(req.body);
    res.send("Thank you");
});

app.get('/getdate', function(req,res){
    let date = new Date();
    res.send('The current date is ' + date.getDate() + '/' + parseInt(date.getMonth() + 1)  + '/' + date.getFullYear());
});

app.get('/gettime', function(req,res){
    let date = new Date();
    res.send('The current time is ' + date.getHours() + ':' + date.getMinutes()  + ':' + date.getSeconds());
});

app.listen(8080);
