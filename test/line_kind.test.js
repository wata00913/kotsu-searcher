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

      describe("and blacket option parentheses", () => {
        it("text is empty", () => {
          expect(lineKindWithoutMark.text("short", "parentheses")).toBe("");
        });
      });
    });

    describe("when mark is not empty", () => {
      it("text is not empty", () => {
        expect(lineKind.text("short")).toBe("普");
      });

      describe("and blacket option parentheses", () => {
        it("text is (普)", () => {
          expect(lineKind.text("short", "parentheses")).toBe("(普)");
        });
      });
    });
  });

  describe("long format text", () => {
    it("text", () => {
      expect(lineKind.text("long")).toBe("普通");
    });
  });

  describe("supplement format text", () => {
    describe("when mark is empty", () => {
      it("text is 普通", () => {
        expect(lineKindWithoutMark.text("supplement")).toBe("普通");
      });
      describe("when mark is 普", () => {
        it("text is 普通", () => {
          expect(lineKind.text("supplement")).toBe("普:普通");
        });
      });
    });
  });
});
