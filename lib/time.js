"use strict";

const { DateTime, Duration } = require("luxon");

module.exports = class Time {
  static earliestFirstTrainTime = new this(4, 0);
  static latestLastTrainTime = new this(26, 0);

  constructor(hour, min, kind, destination) {
    this.hour = typeof hour === "string" ? parseInt(hour) : hour;
    this.min = typeof min === "string" ? parseInt(min) : min;
    this.kind = kind || null;
    this.destination = destination || null;
  }

  compare(other) {
    const l = this.#getTime(this.hour, this.min);
    const r = this.#getTime(other.hour, other.min);
    return this.#compareTime(l, r);
  }

  static fromISO(str) {
    const dTime = Duration.fromISOTime(str);
    return new this(dTime.hours, dTime.minutes);
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
