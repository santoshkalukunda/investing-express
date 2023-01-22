 const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const stockRoute= require('./routes/stockRoute');
const cors = require('cors');
const mongoose = require('mongoose');

 const app =express();

 dotenv.config({path:'config.env'});
 const PORT = process.env.PORT || 4000
 const URL = process.env.URL || "http://localhost:3000"
 

 //log morgan
 app.use(morgan('tiny'));

 //body parser
 app.use(express.json())
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({extended:true}));
 app.use(cors());
 

 //mangoodb
 mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_CONNECT,
  {useUnifiedTopology : true, useNewUrlParser: true},
  console.log("mongoose db conneted")
)


 //set view engine
 app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname,'views/foldername'));

// load assets
app.use(express.static(path.join(__dirname,'/assets')));

 app.get('/', (req, res)=>{
   //  res.send("hello");
   const axios = require("axios");

   const options = {
     method: 'GET',
     url: 'https://twelve-data1.p.rapidapi.com/price',
     params: {symbol: 'AAPL', format: 'json', outputsize: '30'},
     headers: {
       'X-RapidAPI-Key': '79ed8c18c6msh2579512b15be1c2p19c4d7jsnb3325ddf0951',
       'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
     }
   };
   
   axios.request(options).then(function (response) {
     res.send(response.data);
   }).catch(function (error) {
      console.error(error);
   });

 });

 app.use(stockRoute);

 //server listening
 app.listen(PORT, ()=>{
    console.log(`Server is running on ${URL}`);
 })
