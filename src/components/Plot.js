import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

const Plot = (coin) => {
  let hasUid = coin['uid'].length
  let data
  let schema
  if(hasUid){
    
    let uid = coin['uid']
    let coinName = coin['coin']
    console.log("UID", uid)
    fetch("/volume/ohlc/"+uid, {mode: 'cors'})
    .then(response => response.json())
    .then(res => {
      
      data = res[0]
      schema = res[1]
      var dataStore = new FusionCharts.DataStore();
  
      var realtimeChart = new FusionCharts({
        type: "timeseries",
        renderAt: "realtimechart-container",
        width: "800",
        height: "500",
        dataSource: {
          chart: {
            theme: "fusion"
          },
          data: dataStore.createDataTable(data, schema),
          caption: {
            text: coinName+" Price Chart"
          },
          subcaption: {
            text: "30 minutes price chart"
          },
          extensions: {
            "customRangeSelector": {
              "enabled": "0"
            },
            "standardRangeSelector": {
              "enabled": "0"
            }
          },
          yaxis: [{
            plot: {
              value: {
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close"
              },
              type: "candlestick"
            },
            format: {
              prefix: "BTC"
            },
            title: "Coin Price"
          }]
        }
        
      });
  
      realtimeChart.render();
    })
  }
  

  return ( 
    <div className="margin-plot">
      <div id="realtimechart-container"></div>
    </div>
  )
}


export default Plot;