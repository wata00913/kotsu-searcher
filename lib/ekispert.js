"use strict";

const axios = require("axios");
const queryString = require("query-string");

const format = "json";
const BASE_URL = `http://api.ekispert.jp/v1/${format}`;
const ACCESS_KEY = process.env.EKISPERT_ACCESS_KEY;

function mergeURLAndParams(url, params) {
  return queryString.stringifyUrl({ url: url, query: params });
}

exports.fetchStationSummary = async (keyword) => {
  const url = mergeURLAndParams(`${BASE_URL}/station/light`, {
    key: ACCESS_KEY,
    name: keyword,
  });
  return await axios.get(url);
};

exports.fetchRoutes = async (stationCode) => {
  const directionUrl = mergeURLAndParams(
    `${BASE_URL}/operationLine/timetable`,
    {
      key: ACCESS_KEY,
      stationCode: stationCode,
    }
  );

  return await axios.get(directionUrl);
};

exports.fetchTimeTable = async (stationCode, dirCode, dateGroup) => {
  const timetableUrl = mergeURLAndParams(
    `${BASE_URL}/operationLine/timetable`,
    {
      key: ACCESS_KEY,
      stationCode: stationCode,
      code: dirCode,
      dateGroup: dateGroup,
    }
  );
  return axios.get(timetableUrl);
};

exports.getFailureMessage = (responseData) => {
  const status = responseData.response.status;
  const statusMessage = responseData.response.statusText;
  const apiMessage = responseData.response.data.ResultSet.Error.Message;

  return `エラーが発生しました。\n${status} ${statusMessage}:${apiMessage}`;
};

exports.getResultData = (response) => {
  return response.data.ResultSet;
};

exports.isNoSearchResult = (responseData) => {
  const resultData = this.getResultData(responseData);
  return Object.keys(resultData).length === 2;
};

exports.normalize = (objectOrArrayResponseData) => {
  return Array.isArray(objectOrArrayResponseData)
    ? objectOrArrayResponseData
    : [objectOrArrayResponseData];
};
