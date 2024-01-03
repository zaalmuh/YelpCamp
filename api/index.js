const app = require('express')();

app.get('/api', (req, res) => {
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  res.end(`Item: ${slug}`);
});

module.exports = app;
