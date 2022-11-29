"use strict";

const axios = require("axios");

const format = "json";
const BASE_URL = `http://api.ekispert.jp/v1/${format}`;
const ACCESS_KEY = process.env.EKISPERT_ACCESS_KEY;

exports.fetchStationSummary = async (keyword) => {
  const url = `${BASE_URL}/station/light?key=${ACCESS_KEY}&name=${keyword}`;
  return await axios.get(url);
};

exports.fetchRoutes = async (stationCode) => {
  const directionUrl = `${BASE_URL}/operationLine/timetable?key=${ACCESS_KEY}&stationCode=${stationCode}`;

  return await axios.get(directionUrl);
};

exports.fetchTimeTable = async (stationCode, dirCode, dateGroup) => {
  const timetableUrl = `${BASE_URL}/operationLine/timetable?key=${ACCESS_KEY}&stationCode=${stationCode}&code=${dirCode}&dateGroup=${dateGroup}`;
  return axios.get(timetableUrl);
};

exports.getFailureMessage = (responseData) => {
  const status = responseData.response.status;
  const statusMessage = responseData.response.statusText;
  const apiMessage = responseData.response.data.ResultSet.Error.Message;

  return `エラーが発生しました。\n${status} ${statusMessage}:${apiMessage}`;
};

exports.normalize = (objectOrArrayResponseData) => {
  return Array.isArray(objectOrArrayResponseData)
    ? objectOrArrayResponseData
    : [objectOrArrayResponseData];
};
