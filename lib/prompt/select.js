"use strict";

const { Select } = require("enquirer");

module.exports = (message, data) => {
  const question = {
    name: "result",
    message: message,
    choices: data,
  };

  return new Select(question);
};
