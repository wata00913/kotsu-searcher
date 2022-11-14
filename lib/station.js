"use strict";

module.exports = class Station {
  constructor(data) {
    this._code = data.Station.code;
    this._name = data.Station.Name;
    this._type = data.Station.Type;
    this._prefectureCode = data.Prefecture.code;
    this._prefectureName = data.Prefecture.Name;
  }

  line() {
    return [this._name, this._type, this._prefectureName].join(":");
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get prefectureCode() {
    return this._prefectureCode;
  }

  get prefectureName() {
    return this._prefectureName;
  }
};
