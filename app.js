const express = require ("express");
const https = require ("https");
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const city = req.body.cityName;
    const appid = process.env.API;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+appid+"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;

            res.render("weather", {city:city, weatherDescription:weatherDescription, url:imageurl, temp:temp})
            /*res.write("<h1>Temperature of "+ city +" is : " + temp + " degree Celcius.</h1>");
            res.write("<h2>Experience " + weatherDescription + ".</h2>");
            res.write("<img src="+ imageurl +">")
            res.send();*/
        });
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000...");
});






