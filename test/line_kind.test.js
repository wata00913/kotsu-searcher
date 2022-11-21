"use strict";

const LineKind = require("../lib/line_kind");

describe("LineKind", () => {
  describe("short format text", () => {
    it("empty when mark empty", () => {
      const lineKind = new LineKind({ text: "普通", code: "1" });
      expect(lineKind.text("short")).toBe("");
    });

    it("text when mark is not empty", () => {
      const lineKind = new LineKind({
        text: "普通",
        code: "1",
        Mark: "普",
      });
      expect(lineKind.text("short")).toBe("普");
    });
  });
  describe("long format text", () => {
    it("text", () => {
      const lineKind = new LineKind({
        text: "普通",
        code: "1",
        Mark: "普",
      });
      expect(lineKind.text("long")).toBe("普通");
    });
  });
});
