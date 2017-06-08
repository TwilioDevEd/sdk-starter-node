const Router = require('express').Router;

const {registerBind, sendNotification} = require('./notification_handler');
const tokenGenerator = require('./token_generator');
const config = require('./config');

const router = new Router();

router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});

router.post('/token', (req, res) => {
  const identity = req.body.identity;
  res.send(tokenGenerator(identity));
});

router.post('/register', (req, res) => {
  const endpoint = req.body.endpoint;
  const identity = req.body.identity;
  const bindingType = req.body.BindingType;
  const address = req.body.Address;
  registerBind({
    endpoint, identity,
    bindingType, address
  }).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.post('/send-notification', (req, res) => {
  sendNotification(req.body).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.get('/config', (req, res) => {
  res.json(config);
});

module.exports = router;
