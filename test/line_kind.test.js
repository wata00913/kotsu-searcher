"use strict";

const LineKind = require("../lib/line_kind");

describe("LineKind", () => {
  const lineKindWithoutMark = new LineKind({ text: "普通", code: "1" });
  const lineKind = new LineKind({
    text: "普通",
    code: "1",
    Mark: "普",
  });

  describe("short format text", () => {
    describe("when mark empty", () => {
      it("text is empty", () => {
        expect(lineKindWithoutMark.text("short")).toBe("");
      });
    });

    describe("when mark is not empty", () => {
      it("text is not empty", () => {
        expect(lineKind.text("short")).toBe("普");
      });
    });
  });

  describe("long format text", () => {
    it("text", () => {
      expect(lineKind.text("long")).toBe("普通");
    });
  });
});
