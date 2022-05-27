const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = { ip: ctx.request.query.url };
});

app.listen(3001);