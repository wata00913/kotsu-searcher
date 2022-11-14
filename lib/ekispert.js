"use strict";

const axios = require("axios");

const format = "json";
const BASE_URL = `http://api.ekispert.jp/v1/${format}`;
const ACCESS_KEY = process.env.EKISPERT_ACCESS_KEY;

exports.stationSummary = async (keyword) => {
  const url = `${BASE_URL}/station/light?key=${ACCESS_KEY}&name=${keyword}`;
  return await axios.get(url);
};

exports.timeTable = async (stationCode) => {
  const directionUrl = `${BASE_URL}/operationLine/timetable?key=${ACCESS_KEY}&stationCode=${stationCode}`;

  const dirResponse = await axios.get(directionUrl);
  const dirCodes = dirResponse.data.ResultSet.TimeTable.map((t) => t.code);

  return Promise.all(
    dirCodes.map((dirCode) => {
      const timetableUrl = `${BASE_URL}/operationLine/timetable?key=${ACCESS_KEY}&stationCode=${stationCode}&code=${dirCode}`;
      return axios.get(timetableUrl);
    })
  );
};
