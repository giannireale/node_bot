require('dotenv').config()
const { Telegraf } = require('telegraf')
//const { Composer, session } = require('micro-bot')
//const TelegramBot = require('node-telegram-bot-api');
const xlsx  = require ('node-xlsx');
randomCount = 1;
pools = [];
const token = '1777018787:AAFTMxLFi_cQcS4lNDIZ6WqhEV_P5O87obo';
const bot = new Telegraf(token);

//const bot = new Composer()
//const bot = new TelegramBot(token)
bot.command("start", (msg) => msg.reply(`Hello ${msg.from.username}`));


//expressApp.use(bot.webhookCallback("/bot"));
console.log(`${process.env.HEROKU_URL}/bot`)


bot.launch({
    webhook: {
      domain: process.env.HEROKU_URL,
      hookPath: `/bot`,
      port: process.env.PORT
    }
  });


module.exports = bot