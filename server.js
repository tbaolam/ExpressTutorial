const express = require('express');
const app = express();

app.use(express.static('public')); //this is to serve static files, like css, js, images, etc
app.use(express.urlencoded({extended: true})); //this is to parse the data from the form
app.use(express.json()); //this is to parse the data from the form but in json format, with json request

app.set("view engine", "ejs");

app.get('/', logger, (req, res) => { //you can add as many middleware as you want, even 3 logger, logger, logger. it will run 3 times
    //res.download('server.js');
    res.render("index", {text1: "JENNIE"});
})

const userRouter = require('./routes/users');

app.use('/users', userRouter);

// the next is only used in middleware, middleware also run from top to bottom
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(3000)