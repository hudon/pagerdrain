var agent = require('superagent');
var through = require('through');
var logfmt = require('logfmt');
var _ = require('lodash')

var pd = require('./pagerduty')

var uri = process.argv[2];

agent
  .get(uri)
  .set('Accept', 'application/json')
  .pipe(through(function(logline){
    var line = logline.toString()
    console.log(line)
    try {
      //parse json or logfmt
      var jsonData = JSON.parse(line)
      if(jsonData.data[0] == '{'){
        var data = JSON.parse(jsonData.data)
      }else{
        var data = logfmt.parse(jsonData.data)
      }

  /*
      //alerts triggered via log stream
      if(data.alert = 'page'){
        console.log(data.reason)
      }
      */

      //http errors
      if(data.at === 'finish' && data.status > 400 && data.status != 404) {
        data.reason = 'HTTP ' + data.status + ' error detected on ' + jsonData.name + ' ' + jsonData.id
        pd.page(data)
      }
    }
    catch(e) {}
  }))
