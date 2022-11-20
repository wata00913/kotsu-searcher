"use strict";

const LineDestination = require("../lib/line_destination");

describe("LineDestination", () => {
  describe("short format text", () => {
    it("empty when mark empty", () => {
      const lineDestination = new LineDestination({ text: "福間", code: "1" });
      expect(lineDestination.text("short")).toBe("");
    });

    it("text when mark is not empty", () => {
      const lineDestination = new LineDestination({
        text: "福間",
        code: "1",
        mark: "福",
      });
      expect(lineDestination.text("short")).toBe("福");
    });
  });
  describe("long format text", () => {
    it("text", () => {
      const lineDestination = new LineDestination({
        text: "福間",
        code: "1",
        mark: "福",
      });
      expect(lineDestination.text("long")).toBe("福間");
    });
  });
});
