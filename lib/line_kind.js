"use strict";

module.exports = class LineKind {
  constructor({ text, code, Mark = "" }) {
    this._longText = text;
    this._shortText = Mark;
    this._code = code;
  }

  text(format, bracketsType) {
    let text;
    switch (format) {
      case "short":
        text = this._shortText;
        break;
      case "long":
        text = this._longText;
        break;
      case "supplement":
        if (this._shortText === "") {
          text = this._longText;
        } else {
          text = `${this._shortText}:${this._longText}`;
        }
        break;
      default:
        text = "";
    }

    if (!text || bracketsType === undefined) return text;

    return this.#putInBrackets(text, bracketsType);
  }

  #putInBrackets(text, type) {
    if (text === "") return text;

    const brackets = this.#getBrackets(type);
    return brackets[0] + text + brackets[1];
  }

  #getBrackets(type) {
    return {
      parentheses: ["(", ")"],
      square: ["[", "]"],
      curly: ["{", "}"],
    }[type];
  }
};
