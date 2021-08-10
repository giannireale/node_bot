var bot = require('./bot');
if(process.env.NODE_ENV == 'production')
bot.launch({
    webhook: {
      domain: process.env.HEROKU_URL,
      port: process.env.PORT
    }
  }).then(() => console.log("Bot Started!"))
else
    bot.launch().then(() => console.log("Bot Started!"))
require('./web')(bot);