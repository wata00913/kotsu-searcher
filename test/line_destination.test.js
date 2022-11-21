"use strict";

const LineDestination = require("../lib/line_destination");

describe("LineDestination", () => {
  const lineDestinationWithoutMark = new LineDestination({
    text: "福間",
    code: "1",
  });
  const lineDestination = new LineDestination({
    text: "福間",
    code: "1",
    Mark: "福",
  });

  describe("short format text", () => {
    describe("when mark empty", () => {
      it("text is empty", () => {
        expect(lineDestinationWithoutMark.text("short")).toBe("");
      });

      describe("and blacket option parentheses", () => {
        it("text is empty", () => {
          expect(lineDestinationWithoutMark.text("short", "parentheses")).toBe(
            ""
          );
        });
      });
    });

    describe("when mark is not empty", () => {
      it("text  is not empty", () => {
        expect(lineDestination.text("short")).toBe("福");
      });

      describe("and blacket option parentheses", () => {
        it("text is (福)", () => {
          expect(lineDestination.text("short", "parentheses")).toBe("(福)");
        });
      });
    });
  });
  describe("long format text", () => {
    it("text", () => {
      expect(lineDestination.text("long")).toBe("福間");
    });
  });

  describe("supplement format text", () => {
    describe("when mark is empty", () => {
      it("text is 福間", () => {
        expect(lineDestinationWithoutMark.text("supplement")).toBe("福間");
      });
      describe("when mark is 福", () => {
        it("text is 福", () => {
          expect(lineDestination.text("supplement")).toBe("福:福間");
        });
      });
    });
  });
});
