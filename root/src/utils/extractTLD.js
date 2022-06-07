const psl = require('psl');

module.exports = (url) => psl.parse(url).tld; 