const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/netobjexdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB database'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./src/routes/route');

app.use('/', routes); 

app.listen(4000, function () {
  console.log('NetobjecX app listening on port 4000!');
});

