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
        Name: "ใในใ",
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
        Name: "ๅๅ",
        Direction: "ๆนๅ",
        Source: "ใฝใผใน",
        Color: "999999999",
      },
      LineName: {
        text: "็กใ",
        code: "1",
      },
      LineDestination: [
        {
          text: "ๆฑ",
          code: "1",
        },
        {
          text: "ๅๆน้ข",
          code: "5",
          Mark: "ๅ",
        },
        {
          text: "ๅๆฑๆน้ข",
          code: "4",
          Mark: "ๅๆฑ",
        },
      ],
      LineKind: [
        {
          text: "ๆฎ้",
          code: "1",
        },
      ],
    },
  },
};
