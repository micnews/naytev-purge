var hyperquest = require('hyperquest');
var assert = require('assert');
var streamToJson = require('stream-to-json');

module.exports = function (opts, cb) {
  assert(opts, 'opts required');
  assert(opts.key, 'opts.key required');
  assert(opts.url, 'opts.url required');
  assert(opts.siteId, 'opts.siteId required');

  var href = 'https://api.naytev.com/v1/site/' + opts.siteId + '/og-cache/' + encodeURIComponent(opts.url);

  hyperquest.delete(
    href, {
      headers: {
        'Naytev-Key': opts.key,
        'accept-encoding': 'application/json'
      }
    }, function (err, res) {
      if (err) {
        return cb(err);
      }

      if (res.statusCode !== 200) {
        return cb(new Error('failed to purge ' + opts.url));
      }

      streamToJson(res, function (err, json) {
        if (!err && !json.success) {
          err = new Error('failed purging url ' + opts.url);
        }

        cb(err);
      });
    }
  );
};
