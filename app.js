const express = require('express');
const app = express();

const routes = require('./src/routes/route');

app.use('/', routes); 

app.listen(4000, function () {
  console.log('NetobjecX app listening on port 4000!');
});

