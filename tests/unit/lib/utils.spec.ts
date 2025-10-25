import { cn } from "@/lib/utils";
import { test, expect } from "@playwright/test";

test.describe("Lib Utils - Class Name Utility", () => {
  test.describe("cn()", () => {
    test("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    test("should handle conditional classes", () => {
      expect(cn("base", true && "conditional")).toBe("base conditional");
      expect(cn("base", false && "conditional")).toBe("base");
    });

    test("should handle empty strings", () => {
      expect(cn("", "class")).toBe("class");
      expect(cn("class", "")).toBe("class");
    });

    test("should handle undefined and null", () => {
      expect(cn("class", undefined, "other")).toBe("class other");
      expect(cn("class", null, "other")).toBe("class other");
    });

    test("should merge tailwind classes correctly", () => {
      // twMerge should handle conflicting Tailwind classes
      expect(cn("px-2", "px-4")).toBe("px-4");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    test("should handle arrays of classes", () => {
      expect(cn(["class1", "class2"])).toBe("class1 class2");
    });

    test("should handle objects with boolean values", () => {
      expect(cn({ "active": true, "disabled": false })).toBe("active");
    });
  });
});
