"use strict";

const axios = require("axios");
const queryString = require("query-string");

function mergeURLAndParams(url, params) {
  return queryString.stringifyUrl({ url: url, query: params });
}

exports.ekispertClient = class EkispertClient {
  #accessKey;
  #format;
  #baseUrl;

  constructor(accessKey) {
    this.#accessKey = accessKey;
    this.#format = "json";
    this.#baseUrl = `http://api.ekispert.jp/v1/${this.#format}`;
  }
  async fetchStationSummary(keyword) {
    const url = mergeURLAndParams(`${this.#baseUrl}/station/light`, {
      key: this.#accessKey,
      name: keyword,
    });
    return await axios.get(url);
  }
  async fetchRoutes(stationCode) {
    const directionUrl = mergeURLAndParams(
      `${this.#baseUrl}/operationLine/timetable`,
      {
        key: this.#accessKey,
        stationCode: stationCode,
      }
    );

    return await axios.get(directionUrl);
  }

  async fetchTimeTable(stationCode, dirCode, dateGroup) {
    const timetableUrl = mergeURLAndParams(
      `${this.#baseUrl}/operationLine/timetable`,
      {
        key: this.#accessKey,
        stationCode: stationCode,
        code: dirCode,
        dateGroup: dateGroup,
      }
    );
    return axios.get(timetableUrl);
  }
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
