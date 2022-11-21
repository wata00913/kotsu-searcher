"use strict";

const { DateTime } = require("luxon");
const LineDestination = require("./line_destination");
const LineKind = require("./line_kind");
const Time = require("./time");

module.exports = class TimeTableData {
  constructor(times, line, kinds, destinations) {
    this.times = times;
    this.line = line;
    this.kinds = kinds;
    this.destinations = destinations;
  }

  range(from = Time.earliestFirstTrainTime, to = Time.latestLastTrainTime) {
    const times = this.times.filter(
      (time) => 0 <= time.compare(from) && 0 <= to.compare(time)
    );
    return new TimeTableData(times, this.line);
  }

  forEachGroupByHour(callback) {
    // ソート済みであることが前提
    let groupTimes = [];
    this.times.forEach((currentTime, idx) => {
      if (groupTimes.length === 0) {
        groupTimes.push(currentTime);
        return;
      }

      let prevHour = groupTimes[0].hour;
      if (prevHour < currentTime.hour) {
        callback([...groupTimes], prevHour);
        groupTimes = [];
      }
      groupTimes.push(currentTime);
    });

    if (groupTimes.length > 0) {
      callback([...groupTimes], groupTimes[0].hour);
    }
  }

  findTimes(hour, min) {
    return this.times.filter((time) => {
      if (min === undefined) {
        return time.hour === hour;
      } else {
        return time.hour === hour && time.min === min;
      }
    });
  }

  static createFromResponse(response) {
    const timeTable = response.ResultSet.TimeTable;

    const line = timeTable.Line;

    this.kinds = {};
    timeTable.LineKind.forEach((k) => (this.kinds[k.code] = new LineKind(k)));

    this.destinations = {};
    timeTable.LineDestination.forEach(
      (d) => (this.destinations[d.code] = new LineDestination(d))
    );

    const times = this.#convertHourTableResponseToTimes(timeTable.HourTable);
    return new this(times, line, this.kinds, this.destinations);
  }

  static #convertHourTableResponseToTimes(hourTableResponse) {
    return hourTableResponse.flatMap((hourRow) => {
      return this.#convertMinuteTableResponseToTimes(
        hourRow.MinuteTable,
        hourRow.Hour
      );
    });
  }

  static #convertMinuteTableResponseToTimes(minuteTableResponse, hour) {
    const findKind = (code) => this.kinds[code];
    const findDestination = (code) => this.destinations[code];

    const mt =
      minuteTableResponse instanceof Array
        ? minuteTableResponse
        : [minuteTableResponse];

    return mt.map((minuteRow) => {
      return new Time(
        hour,
        minuteRow.Minute,
        findKind(minuteRow.Stop.kindCode),
        findDestination(minuteRow.Stop.destinationCode)
      );
    });
  }
};
