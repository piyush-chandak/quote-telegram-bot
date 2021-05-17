const axios = require("axios");

const QUOTE_URL = 'https://type.fit/api/quotes';
const MAX_LIMIT = 1644;
let quotesCache = [];

const fetchQuotes = async () => {
  if (quotesCache && quotesCache.length) {
    return quotesCache;
  }
  try {
    const { data } = await axios.get(QUOTE_URL).catch(() => []);
    quotesCache = data;
    return data;
  } catch (e) {
    throw e;
  }
};

const randomGenerateIndex = () => {
  return Math.floor(Math.random() * MAX_LIMIT); ;
};

const formatQuote = (quote) => {
  let message= [];
  message.push(`<b>${quote.text}</b>`);
  if (quote.author) {
    message.push(`- ${quote.author}`);
  }
  return message.join(`\n`);
};

const initilizeApp = () => {
  String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
  };
};

module.exports = { initilizeApp, fetchQuotes, randomGenerateIndex, formatQuote };
