"use strict";

const Station = require("../station");
const Time = require("../time");
const TimeTableData = require("../time_table");
const inputPrompt = require("../prompt/input");
const ekispert = require("../ekispert");
const selectPrompt = require("../prompt/select");
const AutoCompletePrompt = require("../prompt/auto_complete");

module.exports = async (options) => {
  const station = await searchStation();

  const route = await selectRoute(station);

  displayTimeTable(station, route, options);
};

async function searchStation() {
  const keyWord = await inputPrompt("入力してください。").run();

  let summaryResponse;
  try {
    summaryResponse = await ekispert.fetchStationSummary(keyWord);
  } catch (e) {
    throw ekispert.getFailureMessage(e);
  }

  let candidates;
  candidates = ekispert.normalize(summaryResponse.data.ResultSet.Point);
  const stations = candidates.map((c) => new Station(c));

  const stationSelection = selectPrompt("駅を選択してください", () => {
    return stations.map((station) => station.line());
  });
  await stationSelection.run();
  return stations[stationSelection.state.index];
}

async function selectRoute(station) {
  const routesResponse = await ekispert.fetchRoutes(station.code);
  const routes = routesResponse.data.ResultSet.TimeTable;

  const routesSelection = selectPrompt("路線を選択してください", () => {
    return routes.map((c) => `${c.Line.Name}:${c.Line.Direction}`);
  });
  await routesSelection.run();
  return routes[routesSelection.state.index];
}

async function displayTimeTable(station, route, options) {
  const timeTableResponse = await ekispert.fetchTimeTable(
    station.code,
    route.code,
    options.daydiagram
  );

  const timeTable = TimeTableData.createFromResponse(timeTableResponse.data);

  let filteredTimeTable;
  if (options.hour) {
    const from = new Time(options.hour, 0);
    const to = new Time(options.hour, 59);
    filteredTimeTable = timeTable.range(from, to);
  } else if (options.from || options.to) {
    const from = options.from
      ? Time.fromISO(options.from)
      : Time.earliestFirstTrainTime;
    const to = options.to ? Time.fromISO(options.to) : Time.latestLastTrainTime;
    filteredTimeTable = timeTable.range(from, to);
  } else {
    filteredTimeTable = timeTable;
  }

  const header = [
    Object.values(filteredTimeTable.kinds)
      .map((kind) => {
        return kind.text("supplement");
      })
      .join(" "),
    Object.values(filteredTimeTable.destinations)
      .map((destination) => {
        return destination.text("supplement");
      })
      .join(" "),
  ].join("\n");

  let data = [];
  filteredTimeTable.forEachGroupByHour((times, hour) => {
    let line = `${hour}時`.padEnd(3) + ": ";
    line += times
      .map((time) => {
        const kind = time.kind.text("short", "parentheses");
        const destination = time.destination.text("short", "square");
        return [`${time.min}分`, kind, destination].join("");
      })
      .join(" ");
    data.push(line);
  });

  const autoCompletePrompt = AutoCompletePrompt("timeTable", data, {
    header: header,
  });
  autoCompletePrompt.run();
}
