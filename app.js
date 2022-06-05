const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    const queryCity=req.body.cityName;
    const queryKey="3474ba1a767b7e4c138ec41dc98e1432";
    const queryUnit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+queryCity+"&appid="+queryKey+"&units="+queryUnit+"";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const desc=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in "+queryCity+ " is "+temp+" degrees Celcius. </h1>");
            res.write("<p>The weather is currently "+desc+".</p>")
            res.write("<img src="+iconUrl+">");
            res.send();
        });
    });
});
app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});