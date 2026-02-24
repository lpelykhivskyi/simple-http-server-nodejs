const sum = require('./sum');

describe('sum:', () => {
  test('should return sum 1+2', () => {
    const result = sum(1, 2);

    expect(result).toBe(3);
  });

  describe('when 1 parameter not passed', () => {
    test('should return NaN when 2nd parameter not passed', () => {
      const result = sum(1);
      expect(result).toBeNaN();
    });

    test('should return NaN when 1st parameter not passed', () => {
      const result = sum(undefined, 2);
      expect(result).toBeNaN();
    });
  });
});

