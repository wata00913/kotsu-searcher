"use strict";

const { DateTime } = require("luxon");

module.exports = class Time {
  static earliestFirstTrainTime = new this(4, 0, null, null);
  static latestLastTrainTime = new this(26, 0, null, null);

  constructor(hour, min, kind, destination) {
    this.hour = typeof hour === "string" ? parseInt(hour) : hour;
    this.min = typeof min === "string" ? parseInt(min) : min;
    this.kind = kind;
    this.destination = destination;
  }

  compare(other) {
    const l = this.#getTime(this.hour, this.min);
    const r = this.#getTime(other.hour, other.min);
    return this.#compareTime(l, r);
  }

  #getTime(hour, min) {
    const day = hour > 23 ? 2 : 1;
    return DateTime.local(1970, 1, day, hour % 24, min);
  }

  #compareTime(left, right) {
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    } else {
      return 0;
    }
  }
};
