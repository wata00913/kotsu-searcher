"use strict";

const OmittableText = require("../lib/omittable_text");

describe("OmittableText", () => {
  const omittableTextWithoutShort = new OmittableText({
    longText: "福間",
  });
  const omittableText = new OmittableText({
    longText: "福間",
    shortText: "福",
  });

  describe("short format text", () => {
    describe("when mark empty", () => {
      it("text is empty", () => {
        expect(omittableTextWithoutShort.text("short")).toBe("");
      });

      describe("and blacket option parentheses", () => {
        it("text is empty", () => {
          expect(omittableTextWithoutShort.text("short", "parentheses")).toBe(
            ""
          );
        });
      });
    });

    describe("when mark is not empty", () => {
      it("text  is not empty", () => {
        expect(omittableText.text("short")).toBe("福");
      });

      describe("and blacket option parentheses", () => {
        it("text is (福)", () => {
          expect(omittableText.text("short", "parentheses")).toBe("(福)");
        });
      });
    });
  });
  describe("long format text", () => {
    it("text", () => {
      expect(omittableText.text("long")).toBe("福間");
    });
  });

  describe("supplement format text", () => {
    describe("when mark is empty", () => {
      it("text is 福間", () => {
        expect(omittableTextWithoutShort.text("supplement")).toBe("福間");
      });
      describe("when mark is 福", () => {
        it("text is 福", () => {
          expect(omittableText.text("supplement")).toBe("福:福間");
        });
      });
    });
  });
});
