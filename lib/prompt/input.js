"use strict";

const { Input } = require("enquirer");

module.exports = (message) => {
  const question = {
    name: "result",
    message: message,
  };

  return new Input(question);
};
