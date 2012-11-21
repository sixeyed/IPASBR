
var http = require('http');
var url = require('url');
var https = require('https');
var auth = require('./Authenticate.js');
var acs = require('./AzureConnectionDetails.js');


auth.getAuthorizationHeaderValue(function (swt) {
    token = 'WRAP access_token=\"' + swt + '\"';
    console.log(token);
    http.createServer(function (request, response) {
        output = null;
        requestUrl = url.parse(request.url, true);
        switch (requestUrl.pathname) {
            case '/reverse':
                console.log(requestUrl.query.string);

                var reqHeaders = {
                    Authorization: token
                };

                var options = {
                    host: acs.namespace() + '.servicebus.windows.net',
                    path: '/rest/reverse?string=' + requestUrl.query.string,
                    headers: reqHeaders
                };

                var req = https.request(options, function (res) {
                    console.log("statusCode: ", res.statusCode);
                    console.log("headers: ", res.headers);
                    response.writeHead(res.statusCode, res.headers);
                    res.on('data', function (d) {
                        var reversed = d.toString('utf8')
                        console.log('svc returned: ' + d.toString('utf8'));
                        response.end(reversed);
                    });
                });
                req.end();
                break;
        }
    }).listen(8013);
});

console.log('FormatServiceRelay listening at http://127.0.0.1:8013/');