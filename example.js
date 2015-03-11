var purge = require('./');

purge({
  url: process.argv[2],
  siteId: process.env.NAYTEV_SITE_ID,
  key: process.env.NAYTEV_KEY
}, function (err) {
  console.log(arguments);
});
