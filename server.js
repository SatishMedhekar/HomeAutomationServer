const express     = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const cors = require('cors');
var socket = require('socket.io');
//var menu = require('./app/jsonfile/westher.js');
var weatherJson = require('./app/jsonfile/weather.js')
//var calenderjson = require('./app/jsonfile/calender.js')
var calendarfun = require('./app/jsonfile/calender')
var data = require('./app/data')


const app         = express();
const port        = 8808;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
require('../AutomationService/app/routes')(app,{});
var server = app.listen(port, () => {
    console.log("We are listening on port " + port);
})

var io = socket(server)
var m = 'hello';
var weatherjson = new weatherJson();
//var calenderjson = new calenderjson();
    // setInterval(() =>{
    // io.sockets.emit('message',m)
    // console.log(m);
    // },1000);


io.on('connection', function(socket){
    console.log('made socket connection');
   
    socket.on('disconnect',function(){
        console.log('user disconnected');
    })
   var cntr =1;
    //socket.on('message', () => {
        setInterval(() =>{
        io.sockets.emit('message',weatherjson.getWeather(cntr));
        console.log(cntr);
            if (cntr > 7){
                cntr = 1;
            }
            cntr = cntr + 1;
        },60*1000);


        calendarfun.getCalenderDetail(function(err, result){
            console.log(`calenderDetail ${JSON.stringify(result)}`)
        })

        // var calenderDetail = {
        //     monthDetail:calendarfun.getcalenderMonth(),
        //     //birthDays = calenderjson.getBirthDay()
        // }

        // calendarfun.getcalenderMonth(function(err,result){
        //     console.log(JSON.stringify(result)) 
        //     var monthDetail = result   
        //     io.sockets.emit('calender',monthDetail);
        // })
    
})