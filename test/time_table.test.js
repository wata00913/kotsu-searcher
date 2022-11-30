const Time = require("../lib/time");
const TimeTable = require("../lib/time_table");

describe("range", () => {
  describe("when from is 5:00 and to is 5:47", () => {
    it("return times in 5:00~5:47", () => {
      const from = new Time(5, 0);
      const to = new Time(5, 47);
      const timeTable = TimeTable.createFromResponse(response).range(from, to);
      timeTable.times.forEach((time) => {
        expect(time.hour).toEqual(5);
      });
      expect(timeTable.times.length).toBe(1);
    });
  });
});

describe("forEachGroupByHour", () => {
  describe("when group by hour", () => {
    it("group 5 and 24", () => {
      const timeTable = TimeTable.createFromResponse(response);
      let idx = 0;
      const hours = [5, 24];
      timeTable.forEachGroupByHour((times, hour) => {
        times.forEach((time) => {
          expect(time.hour).toBe(hours[idx]);
          expect(hour).toBe(hours[idx]);
        });
        idx++;
      });
      expect(idx).toBe(2);
    });
  });
});

const response = {
  ResultSet: {
    apiVersion: "",
    engineVersion: "",
    TimeTable: {
      trainCount: "",
      code: "",
      dateGroup: "weekday",
      Station: {
        Name: "テスト",
      },
      HourTable: [
        {
          TimeReliability: "onTimeTable",
          MinuteTable: [
            {
              Minute: "44",
              Stop: {
                kindCode: "1",
                lineCode: "99999",
                nameCode: "1",
                destinationCode: "5",
              },
            },
            {
              Minute: "48",
              Stop: {
                kindCode: "1",
                lineCode: "99999",
                nameCode: "1",
                destinationCode: "5",
              },
            },
          ],
          Hour: "5",
        },
        {
          TimeReliability: "onTimeTable",
          MinuteTable: {
            Minute: "19",
            Stop: {
              kindCode: "1",
              lineCode: "99999",
              nameCode: "1",
              destinationCode: "4",
            },
          },
          Hour: "24",
        },
      ],
      Line: {
        Name: "名前",
        Direction: "方向",
        Source: "ソース",
        Color: "999999999",
      },
      LineName: {
        text: "無し",
        code: "1",
      },
      LineDestination: [
        {
          text: "東",
          code: "1",
        },
        {
          text: "北方面",
          code: "5",
          Mark: "北",
        },
        {
          text: "北東方面",
          code: "4",
          Mark: "北東",
        },
      ],
      LineKind: [
        {
          text: "普通",
          code: "1",
        },
      ],
    },
  },
};
