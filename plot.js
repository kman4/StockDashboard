var apiKey = "JMwV2L9MxWPWPfQPwk1B";

/* global Plotly */
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
var selectorOptions = {
  buttons: [{
      step: 'month',
      stepmode: 'backward',
      count: 1,
      label: '1m'
  }, {
      step: 'month',
      stepmode: 'backward',
      count: 6,
      label: '6m'
  }, {
      step: 'year',
      stepmode: 'todate',
      count: 1,
      label: 'YTD'
  }, {
      step: 'year',
      stepmode: 'backward',
      count: 1,
      label: '1y'
  }, {
      step: 'all',
  }],
};
console.log(url);
/**
 * Fetch data and build the timeseries plot
 */
function buildPlot() {
  d3.json(url).then(function(data) {
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date; 
    var dates = unpack(data.dataset.data, 0)
    var closingPrices = unpack(data.dataset.data, 4)
    var openingPrices = unpack(data.dataset.data, 1)
    //console.log(dates);
    //console.log(closingPrices);
    var trace1 = {
      x: dates, 
      y: closingPrices,
      type: "scatter", 
      mode: "line", 
      name: stock, 
      line : {
        color: "#000000"
      }
    };
    var trace2 = {
      x: dates, 
      y: openingPrices,
      type: "scatter", 
      mode: "line", 
      name: stock, 
      line : {
        color: "#545454"
      }
    };
    var data = [trace1, trace2];
    var layout = {
      title: `${name} Stock Price`, 
      xaxis: {
        range: [startDate, endDate],
        type: "date", 
        rangeselector : selectorOptions, 
        rangeslider : {}
      }, 
      yaxis: {
        fixedrange : true
      }
    };
    Plotly.newPlot("plot", data, layout)
  });
}
buildPlot();

