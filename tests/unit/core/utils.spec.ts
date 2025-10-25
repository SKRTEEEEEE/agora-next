import { double, triple } from "@/core/utils";
import { test, expect } from "@playwright/test";

test.describe("Core Utils - Math Functions", () => {
  test.describe("double()", () => {
    test("should return double of positive numbers", () => {
      expect(double(2)).toBe(4);
      expect(double(3)).toBe(6);
      expect(double(10)).toBe(20);
    });

    test("should return double of negative numbers", () => {
      expect(double(-2)).toBe(-4);
      expect(double(-5)).toBe(-10);
    });

    test("should handle zero", () => {
      expect(double(0)).toBe(0);
    });

    test("should handle decimal numbers", () => {
      expect(double(2.5)).toBe(5);
      expect(double(1.5)).toBe(3);
    });
  });

  test.describe("triple()", () => {
    test("should return triple of positive numbers", () => {
      expect(triple(2)).toBe(6);
      expect(triple(3)).toBe(9);
      expect(triple(10)).toBe(30);
    });

    test("should return triple of negative numbers", () => {
      expect(triple(-2)).toBe(-6);
      expect(triple(-3)).toBe(-9);
    });

    test("should handle zero", () => {
      expect(triple(0)).toBe(0);
    });

    test("should handle decimal numbers", () => {
      expect(triple(2.5)).toBe(7.5);
      expect(triple(1.5)).toBe(4.5);
    });
  });
});
