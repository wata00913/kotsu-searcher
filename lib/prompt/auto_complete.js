"use strict";

const { AutoComplete } = require("enquirer");
const { search } = require("fast-fuzzy");

class MyAutoComplete extends AutoComplete {
  constructor(message, data, options = {}) {
    const question = {
      name: "result",
      message: message,
      choices: data,
      ...options,
    };
    super(question);
    this.matches = [];
  }

  suggest(typed = this.input, choices = this.state._choices) {
    if (!typed) {
      this.matches = [];
      return choices;
    }

    const matchResult = search(typed, choices, {
      keySelector: (c) => c.message,
      returnMatchData: true,
      sortBy: "insertOrder",
    });
    this.matches = matchResult.map((m) => {
      return { choiceIndex: m.item.index, ...m.match };
    });
    return matchResult.map((m) => m.item);
  }

  async render() {
    //await super.render();
    if (this.state.status !== "pending") return super.render();
    let style = this.options.highlight
      ? this.options.highlight.bind(this)
      : this.styles.placeholder;

    // customize highlight
    let color = this.#myHighlight(style);
    let choices = this.choices;
    this.choices = choices.map((ch) => ({
      ...ch,
      message: color(
        ch.message,
        this.matches.find((m) => m.choiceIndex === ch.index)
      ),
    }));
    await super.render();
    this.choices = choices;
  }

  #myHighlight(color) {
    return (str, match) => {
      if (match === undefined) return str;
      let i = match.index;
      let colored = color(str.slice(i, i + match.length));
      return str.slice(0, i) + colored + str.slice(i + match.length);
    };
  }
}

module.exports = (message, data, options) =>
  new MyAutoComplete(message, data, options);
