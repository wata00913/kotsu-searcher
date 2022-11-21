"use strict";

module.exports = class LineDestination {
  constructor({ text, code, Mark = "" }) {
    this._longText = text;
    this._shortText = Mark;
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
      case "supplement":
        if(this._shortText === "") {
          text = this._longText;
        } else {
          text = `${this._shortText}:${this._longText}`;
        }
        break;
      default:
        text = "";
    }
    return text;
  }
}
