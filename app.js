// *****************************************
// ****    Created by Piyush Chandak    ****
// *****************************************

const { Telegraf } = require('telegraf');

const { MESSAGES } = require('./messages');
const { initilizeApp, fetchQuotes, randomGenerateIndex, formatQuote } = require('./helper');

const bot = new Telegraf(process.env.BOT_TOKEN);

const options = {
  parse_mode: "HTML"
};

// Initilize Application variables and methods
initilizeApp();

bot.command('start', (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;

  bot.telegram.sendMessage(chatId, MESSAGES.WELCOME_NOTE.interpolate({user}), options);
  bot.telegram.sendMessage(chatId, MESSAGES.NOTIFY, options);
})

bot.hears(/quote/i, async (msg) => {
  const quotes = await fetchQuotes();
  let index = randomGenerateIndex();
  while (!quotes[index]) {
    index = randomGenerateIndex();
  }
  msg.reply(formatQuote(quotes[index]), options);
});

// For any message which are not handle
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.telegram.sendMessage(chatId, MESSAGES.INVALID_INPUT, options);
  bot.telegram.sendMessage(msg.chat.id, MESSAGES.NOTIFY, options);
});

// For any sticker which are not handle
bot.on('sticker', (msg) => {
  const chatId = msg.chat.id;

  bot.telegram.sendMessage(chatId, messages.INVALID_INPUT_MSG, options);
  bot.telegram.sendMessage(chatId, MESSAGES.NOTIFY, options);
});

bot.launch();
