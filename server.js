const http = require('http');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const Tickets = require('./Tickets');


// Static file handling
const public = path.join(__dirname, '/public')
app.use(koaStatic(public));

// => CORS
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

// => Body Parsers
app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

const tickets = new Tickets();

app.use(async ctx => {
  const { method } = ctx.request.querystring;
  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets.allTickets();
      return;
    case 'ticketById':
      const { id } = ctx.request.query;
      ctx.response.body = tickets.ticketById(id);
      return;
    case 'createTicket':
      const { name, description } = ctx.request.body;
      tickets.createTicket(name, description);
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});


const server = http.createServer(app.callback()).listen(7080);