  
var express = require('express');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

// var server = app.listen(process.env.PORT, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log(host)
//   console.log('Web server started at http://%s:%s', host, port);
// });

module.exports = function (bot) {
  console.log(process.env.BOT_TOKEN)
  app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.status(200).json({ message: 'ok' });
});
};