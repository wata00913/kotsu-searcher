"use strict";

const OmittableText = require("./omittable_text");

module.exports = class LineDestination extends OmittableText {
  constructor({ text, code, Mark = "" }) {
    super({longText: text, shortText: Mark});
    this._code = code;
  }
};
