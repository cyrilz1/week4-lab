let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
//app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));
app.use(express.static('css'));

app.get('/', function (req, res) {
    res.render('index.html');
});

db = []

app.get('/newtask', function(req,res){
    res.sendFile(__dirname + '/views/newtask.html');
});

// app.get('/newtask', function(req,res){
//     res.render('newtask.html');
// });

app.post('/newtask', function(req,res){
    let newTasks = {
        taskname: req.body.taskName,
        taskdue: req.body.taskDue,
        taskdesc: req.body.taskDesc
    }
    db.push(newTasks);
    res.sendFile(__dirname + '/views/newtask.html');
});

app.get('/listtasks', function(req,res){
    res.render('listtasks.html',{taskDb: db});
});

app.listen(8080);