require('dotenv/config');
const Koa = require('koa');
const tlds = require('./utils/tlds');
const extractTLD = require('./utils/extractTLD');

const app = new Koa();

app.use(async ctx => {
  const { url } = ctx.request.query;
  
  const tld = extractTLD(url);

  const correctTld = Object.keys(tlds).find(knownTld => knownTld === tld);

  if (correctTld) {
    ctx.status = 303;
    ctx.body = { tld_url: tlds[correctTld] };
  } else {
    ctx.status = 204;
  }
});

app.listen(process.env.PORT);