
var https = require('https');
var qs = require('querystring');
var url = require('url');
var acs = require('./AzureConnectionDetails.js');

exports.getAuthorizationHeaderValue = function getAuthorizationHeaderValue(callback) {

    var options = {
        host: acs.namespace() + '-sb.accesscontrol.windows.net',
        path: '/WRAPv0.9/',
        method: 'POST'
    };

    var values = {
        wrap_name: acs.issuerName(),
        wrap_password: acs.issuerSecret(),
        wrap_scope: 'http://' + acs.namespace() + '.servicebus.windows.net/'
    };

    console.log('Authenticating with ACS...');
    console.log(qs.stringify(values));

    var req = https.request(options, function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function (d) {
            var token = qs.parse(d.toString('utf8'));
            callback(token.wrap_access_token);
        });
    });
    req.write(qs.stringify(values));
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}
