#!/usr/bin/env node
const arg = require("arg");
const { Duration } = require("luxon");

const optionSettings = {
  "--hour": Number,
  "--from": String,
  "--to": String,
  "--daydiagram": String,
};

const commandDefaultOptions = {
  timetable: {
    "daydiagram": "weekday",
  },
};

const successResult = { success: true, message: "" };

const validation = {
  timetable: {
    "daydiagram": (val) => {
      if (!["weekday", "saturday", "holiday"].includes(val)) {
        return { success: false, message: "diagramの値が不正です" };
      }
      return successResult;
    },

    "hour": (val) => {
      if (isNaN(val) || val < 0)
        return { success: false, message: "時刻の値が不正です" };
      return successResult;
    },

    "from": function (val) {
      return this.timeValid(val);
    },
    "to": function (val) {
      return this.timeValid(val);
    },

    timeValid(timeStr) {
      const time = Duration.fromISOTime(timeStr);
      if (!Object.keys(time.toObject()).length)
        return { success: false, message: "時刻が不正です" };
      return successResult;
    },
  },
};

main();

async function main() {
  if (process.env.EKISPERT_ACCESS_KEY === undefined) {
    console.log("環境変数:EKISPERT_ACCESS_KEYを設定してください。");
    return;
  }

  const timetable = require("./lib/serach_command/timetable");
  try {
    const [, options] = parseOptions();
    await timetable(options);
  } catch (e) {
    console.log(e);
    return;
  }
}

function parseOptions() {
  const args = arg(optionSettings);
  const command = args["_"][0];
  delete args["_"];

  const normalize = (obj, propName) => {
    const reg = /^--(\w+)/;
    const match = propName.match(reg);
    if (!match) return;

    obj[match[1]] = obj[match[0]];
    delete obj[match[0]];
  };
  Object.keys(args).forEach((key) => normalize(args, key));

  if (!Object.prototype.hasOwnProperty.call(commandDefaultOptions, command))
    throw "コマンドを指定してください";

  const options = { ...commandDefaultOptions[command], ...args };
  const validators = validation[command];

  for (const key in options) {
    const result = validators[key](options[key]);
    if (!result.success) throw result.message;
  }

  return [command, options];
}
