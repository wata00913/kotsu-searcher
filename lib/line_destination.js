"use strict";

module.exports = class LineDestination {
  constructor({ text, code, mark = "" }) {
    this._longText = text;
    this._shortText = mark;
    this._code = code;
  }

  text(format) {
    let text;
    switch (format) {
      case "short":
        text = this._shortText;
        break;
      case "long":
        text = this._longText;
        break;
      default:
        text = "";
    }
    return text;
  }
}
