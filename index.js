#!/usr/bin/env node
const ekispert = require("./lib/ekispert");

main();

function main() {
  if (process.env.EKISPERT_ACCESS_KEY === undefined) {
    console.log("環境変数:EKISPERT_ACCESS_KEYを設定してください。");
    return;
  }

  const timetable = require('./lib/serach_command/timetable');
  timetable();
}
