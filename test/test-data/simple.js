describe("binaryStringToNumber", () => {
  describe("given an invalid binary string", () => {
    test("composed of non-numbers throws CustomError", () => {
      expect(() => binaryStringToNumber("abc")).toThrowError(CustomError);
    });

    test("with extra whitespace throws CustomError", () => {
      expect(() => binaryStringToNumber("  100")).toThrowError(CustomError);
    });
  });

  describe("given a valid binary string", () => {
    test("returns the correct number", () => {
      expect(binaryStringToNumber("100")).toBe(4);
    });
  });
});
