const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const cookieParser =require('cookie-parser');
const routes =require('./routes/routes');
const app =express();
const PORT =process.env.PORT || 8080;


//////////////////////
/// Connect To Database
/////////////////////
mongoose.Promise =global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/blog');

app.use(bodyParser.json());
app.use(cookieParser());


/// Cors Middleware
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

/// Apply Routes
app.use('/', routes);



//////////////////////
/// Listen To Server
/////////////////////
app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
        console.log(`Your Server Is Running On Port ${PORT}`);
});