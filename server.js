/* eslint-disable */
require("dotenv").config();

const express = require("express");
const path = require("path");
const request = require("request-promise-native");
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('./logger');

const app = express();

const port = process.env.PORT || 5002;
const apiUrl = process.env.API_URL;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny', {
  skip: (req, res) => { return (req.url === '/'); },
}));

app.use(express.static(path.join(__dirname, "build")));


// proxy all API calls to our API
const apigwBaseOptions = {
  json: true,
  resolveWithFullResponse: true,
};
app.use('/api', (req, res) => {
  const options = {
    url: `${apiUrl}${req.path}`,
    method: req.method,
    qs: req.query,
    body: req.body,
    headers: req.headers,
    ...apigwBaseOptions,
  };

  return request(options)
    .then((response) => {
      res.status(response.statusCode);
      return res.send(response.body);
    })
    .catch((err) => {
      logger.error(err);
      res.status(err.statusCode);
      return res.send(err.error);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/lifecheck', (req, res) => {
  res.status(200);
  res.send('OK');
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
