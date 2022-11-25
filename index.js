// 387fa4c936732662f7662989358d02d6
const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/" , function(req,res){
    console.log(req.body.cityName)

const query = req.body.cityName;
const unit = "metric";
const apikey = "387fa4c936732662f7662989358d02d6";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apikey}`

https.get(url,(response)=>{
console.log(response.statusCode)

response.on("data",(data)=>{
    const weatherdata = JSON.parse(data)
    const temp = weatherdata.main.temp
    const wheatherdis = weatherdata.weather[0].description
    const imgid = weatherdata.weather[0].icon

const imgurl = `https://openweathermap.org/img/wn/${imgid}@2x.png`

res.write(`<h1>The temperature in ${query} is ${temp}</h1>`)
res.write(`<p>The cloud is ${wheatherdis}<p>`) 
res.write(`<img src="${imgurl}">`)
res.send()    

})
})
})








app.listen(3000,function(){
    console.log("server created and ruuning on port 3000")
})

