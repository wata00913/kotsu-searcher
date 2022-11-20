"use strict";

const Time = require("../lib/time");

describe("Time", () => {
  describe("compare", () => {
    const first = new Time(5, 20, null, null);
    const last = new Time(24, 1, null, null);
    const first2 = new Time(5, 20, null, null);
    it("last is larger than first", () => {
      expect(last.compare(first)).toBe(1);
    });
    it("first is smaller than last", () => {
      expect(first.compare(last)).toBe(-1);
    });
    it("first is same first2", () => {
      expect(first.compare(first2)).toBe(0);
    });
  });
});
