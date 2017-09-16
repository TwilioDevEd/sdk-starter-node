const Router = require('express').Router;

const {registerBind, sendNotification} = require('./notification_handler');
const tokenGenerator = require('./token_generator');
const config = require('./config');

const router = new Router();

// Convert keys to camelCase to conform with the twilio-node api definition contract
const camelCase = require('camelcase');
function camelCaseKeys(hashmap) {
  var newhashmap = {};
  Object.keys(hashmap).forEach(function(key) {
    var newkey = camelCase(key);
    newhashmap[newkey] = hashmap[key];
  });
  return newhashmap;
};

router.get('/token/:id', (req, res) => {
  const request = require('request');
  const id = req.params.id;
  const url = `https://www.twilio.com/quest/video/token/YSDXN77VE7RA2JU/${id}?format=json`;

  request({
    url: url,
    method: 'GET',
    headers: {
      // Authorization: 'ApiKey myUser:verySecretAPIKey',
      Accept: 'text/json'
    },
    function(error, response, body) {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(response);
      console.log(body);
      res.send(body);
    }
  });
});

router.get('/token', (req, res) => {
  const identity = req.body.identity;
  res.send(tokenGenerator(identity));
});

router.post('/register', (req, res) => {
  var content = camelCaseKeys(req.body);
  registerBind(content).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.post('/send-notification', (req, res) => {
  var content = camelCaseKeys(req.body);
  sendNotification(content).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.get('/config', (req, res) => {
  res.json(config);
});

module.exports = router;
