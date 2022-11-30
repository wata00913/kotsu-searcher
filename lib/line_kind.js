"use strict";

const OmittableText = require("./omittable_text");

module.exports = class LineKind extends OmittableText {
  constructor({ text, code, Mark = "" }) {
    super({ longText: text, shortText: Mark });
    this._code = code;
  }
};
