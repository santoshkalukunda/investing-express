const { json } = require('body-parser');
const dotenv = require('dotenv');
const { sma_inc, ema_inc, rsi_inc, macd_inc, markers_inc } = require('../indicator/indicatores');
const got = require('got');
const { render } = require('ejs');
const IndicatorModel = require('../models/IndicatorModel');

dotenv.config({path:'config.env'});
 const URL = process.env.URL || "http://localhost:3000"



//stockshow page
const index = async (req, res) => {
  // res.render("index");
  try {
    res.render('stock-index',{
      URL : URL,
    });
  } catch (error) {
    res.send({message: error});
  }
}

//stockshow page
const index1 = async (req, res) => {
  var symbol = req.query.symbol;
  var interval = req.query.interval;
  var indicators = req.query.indicatore;

  try {
    // const product = await Product.findById(req.params.productId);
    const smaIndicator = await IndicatorModel.findById('63be8d7c784d427bfe811c25');

    res.render('stock-index',{
      URL : URL,
      symbol : symbol,
      interval : interval,
      smaIndicator : smaIndicator
    });
  } catch (error) {
    res.send({message: error});
  }
}
const smaSave = async (req, res) => {
  try {
      const smaIndicator = await IndicatorModel.findById('63be8d7c784d427bfe811c25');
    const indicatorModel = new IndicatorModel({
        name : req.body.name,
        smaSource : req.body.smaSource,
        value : req.body.value,
        lineType : req.body.lineType,
        color : req.body.color,
        lineThiknes : req.body.lineThiknes,
        });
        const result = await indicatorModel.save();
        res.redirect('back');
 } catch (error) {
    res.status(400).send(error);
 }
}

//respone send api
const show = async (req, res)=>{
  // res.send(req.params);
try {
   const symbol = req.params.symbol; 
   const interval= req.params.interval; 
   const resp = await got(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=10000`);
  const data = JSON.parse(resp.body);
  let klinedata = data.map((d)=>({
    time: d[0]/1000,
    open : d[1]*1,
    high : d[2]*1,
    low : d[3]*1,
    close: d[4]*1,
  }));
 klinedata = await sma_inc(klinedata);
 klinedata = await ema_inc(klinedata);
 klinedata = await rsi_inc(klinedata);
 klinedata = await markers_inc(klinedata);
 klinedata = await macd_inc(klinedata);
 
  res.json(klinedata);
// console.log(klinedata);
  // res.render('stock-index',{
  //   klinedata : klinedata,
  // });
  } catch (error) {
  res.send({
    message : error,
  })
}
};

module .exports = {
  show,
  index,
  index1,
  smaSave,
    }