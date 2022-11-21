"use strict";

const { AutoComplete } = require("enquirer");

module.exports = (message, data, options = {}) => {
  const question = {
    name: "result",
    message: message,
    choices: data,
    ...options
  };

  return new AutoComplete(question);
};
