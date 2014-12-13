# logspout-drain


## usage

    docker run -it -e PAGERDUTY_SERVICE_KEY=<key> pagerdrain http://logspout:88/logs

## tail logs via logspout

this one parses logs for HTTP errors and creates pagerduty alerts
