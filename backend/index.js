const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
