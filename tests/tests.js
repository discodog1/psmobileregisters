describe("Testing:", function() {
  it("true is true", function() {
    expect(true).toBe(true);
  });
  it("1 is 2", function() {
	 expect(1).not.toEqual(2);
  });
});

describe("More Testing:", function() {
  it("true is true", function() {
    expect(true).toBe(true);
  });
  it("2 is less than 4", function() {
	 expect(2).toBeLessThan(4);
  });
});

