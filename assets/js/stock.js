const {log, error} = console;
const getData = async() => {
  const resp =  await fetch (`${app_url}/api/stock/${symbol}/${intraval}`);
  const data = await resp.json();
  return data;


// log(data);

}
// getData();

const renderChart = async ()=>{
const chartProperties = {
  width:1500,
  height:600,
timeScale : {
timeVisible: true,
secodsVisible: true,
},
pane:0,
};
const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement, chartProperties);
const candleSeries = chart.addCandlestickSeries();
const klinedata = await getData();
candleSeries.setData(klinedata);

//sma
const sma_series = chart.addLineSeries({
color: 'red',
lineWidth: 1
});
const sma_data = klinedata
.filter((d)=> d.sma)
.map((d)=>({
time:d.time,
value:d.sma
}));
sma_series.setData(sma_data);


//sma
const ema_series = chart.addLineSeries({
color: 'green',
lineWidth: 1
});
const ema_data = klinedata
.filter((d)=> d.ema)
.map((d)=>({
time:d.time,
value:d.ema
}));
ema_series.setData(ema_data);
 
 //MARKERS
 candleSeries.setMarkers(
    klinedata
      .filter((d) => d.long || d.short)
      .map((d) =>
        d.long
          ? {
              time: d.time,
              position: 'belowBar',
              color: 'green',
              shape: 'arrowUp',
              text: 'LONG',
            }
          : {
              time: d.time,
              position: 'aboveBar',
              color: 'red',
              shape: 'arrowDown',
              text: 'SHORT',
            }
      )
  );
  //RSI
  const rsi_series = chart.addLineSeries({
    color: '#2196f3',
    lineWidth: 1,
    pane: 1,
  });
  const rsi_data = klinedata
    .filter((d) => d.rsi)
    .map((d) => ({ time: d.time, value: d.rsi }));
  rsi_series.setData(rsi_data);

  //macd
  //MACD FAST
  const macd_fast_series = chart.addLineSeries({
    color: 'blue',
    lineWidth: 1,
    pane: 2,
  });
  const macd_fast_data = klinedata
    .filter((d) => d.macd_fast)
    .map((d) => ({ time: d.time, value: d.macd_fast }));
  macd_fast_series.setData(macd_fast_data);

    //MACD SLOW
    const macd_slow_series = chart.addLineSeries({
        color: 'red',
        lineWidth: 1,
        pane: 2,
      });
      const macd_slow_data = klinedata
        .filter((d) => d.macd_slow)
        .map((d) => ({ time: d.time, value: d.macd_slow }));
      macd_slow_series.setData(macd_slow_data);

  //MACD HISTOGRAM
  const macd_histogram_series = chart.addHistogramSeries({
    pane: 2,
  });
  const macd_histogram_data = klinedata
    .filter((d) => d.macd_histogram)
    .map((d) => ({
      time: d.time,
      value: d.macd_histogram,
      color: d.macd_histogram > 0 ? 'green' : 'red',
    }));
  macd_histogram_series.setData(macd_histogram_data);

}


renderChart();
