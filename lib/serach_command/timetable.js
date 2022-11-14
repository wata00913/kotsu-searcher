"use strict";

const Station = require("../station");

exports.module = async () => {
  const inputPrompt = require("../prompt/input");
  const keyWord = await inputPrompt("入力してください。").run();

  const { stationSummary } = require("../ekispert");
  const summaryResponse = await stationSummary(keyWord);
  let candidates;
  candidates = Array.isArray(summaryResponse.data.ResultSet.Point)
    ? summaryResponse.data.ResultSet.Point
    : [summaryResponse.data.ResultSet.Point];
  const stations = candidates.map((c) => new Station(c));

  const selectPrompt = require("../prompt/select");
  const stationSelection = selectPrompt("駅を選択してください", () => {
    return stations.map((station) => station.line());
  });
  await stationSelection.run();
  const selected = stations[stationSelection.state.index];

  const { timeTable } = require("../ekispert");

  const timeTableResponses = await timeTable(selected.code));
};
