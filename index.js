#!/usr/bin/env node
const config = require("./config/config.json");
const Wordnick = require("./lib/wordnick");

/**
 * Dictionary object to call methods on dictiionary
 * @type {wordnick}
 */
const dictionary = new Wordnick(config.wordnick);

word = dictionary.wordOfTheDay("mobile");
console.log(word)

