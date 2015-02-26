# pagerdrain

parses structured log for HTTP errors and creates pagerduty alerts

## usage

    docker run -it --link logspout:logspout -e PAGERDUTY_SERVICE_KEY=<key> csquared/pagerdrain http://logspout:8000/logs
