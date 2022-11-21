"use strict";

const Station = require("../station");
const inputPrompt = require("../prompt/input");
const ekispert = require("../ekispert");
const selectPrompt = require("../prompt/select");

exports.module = async () => {
  const station = await searchStation();
};

async function searchStation() {
  const keyWord = await inputPrompt("入力してください。").run();

  const summaryResponse = await ekispert.fetchStationSummary(keyWord);
  let candidates;
  candidates = ekispert.normalize(summaryResponse.data.ResultSet.Point);
  const stations = candidates.map((c) => new Station(c));

  const stationSelection = selectPrompt("駅を選択してください", () => {
    return stations.map((station) => station.line());
  });
  await stationSelection.run();
  return stations[stationSelection.state.index];
}
