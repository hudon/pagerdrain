var logfmt = require('logfmt')
var pager, PagerDuty;

PagerDuty = require('pagerduty');

pager = new PagerDuty({
  serviceKey: process.env.PAGERDUTY_SERVICE_KEY // required
});

var open_incidents = {}

exports.page = function(data){
  var logger = logfmt.namespace({at: 'page'})
  logger.log(data)
  pager.create({
    description: data.reason,
    details: data,
    incident_key: open_incidents[data.path],
    callback: function(err, response) {
      if (err) {
        logger.error(err);
        return
      }
      open_incidents[data.path] = response.incident_key
    }
  })
}
