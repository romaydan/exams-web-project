const express = require('express');
const app = express();
const cors = require('cors');
const questions = require('./routes/questions');
const config = require('config');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());
app.use('/api/questions', questions);

const db = config.get('db');
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${db}...`));

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
