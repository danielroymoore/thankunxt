const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');
var bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get('/', (req, res) => {
    return ssrCache({ req, res, pagePath: '/' });
  });

  server.post('/search', (req, res) => {
    res.json(Math.floor((Math.random() * 10) + 1));
  })

  server.get('/results/:id', (req, res) => {
    const queryParams = { id: req.params.id };
    app.render(req, res, '/results', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
