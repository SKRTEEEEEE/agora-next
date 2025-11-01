import { cn, generatePaymentLink } from "@/lib/utils";
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

test.describe("Lib Utils - Payment Utilities", () => {
  test.describe("generatePaymentLink()", () => {
    test("should generate correct payment link for STUDENT plan", () => {
      const userId = "user123";
      const link = generatePaymentLink(userId, "STUDENT");
      
      expect(link).toBe("https://buy.stripe.com/test_9AQdUw0QVdLZ3Ic14a?client_reference_id=user123");
      expect(link).toContain("client_reference_id=user123");
    });

    test("should generate correct payment link for STUDENT_P plan", () => {
      const userId = "user456";
      const link = generatePaymentLink(userId, "STUDENT_P");
      
      expect(link).toBe("https://buy.stripe.com/test_fZe17K2Z3dLZ2E8aEL?client_reference_id=user456");
      expect(link).toContain("client_reference_id=user456");
    });

    test("should include userId as client_reference_id", () => {
      const userId = "testUser789";
      const linkStudent = generatePaymentLink(userId, "STUDENT");
      const linkStudentP = generatePaymentLink(userId, "STUDENT_P");
      
      expect(linkStudent).toContain(`client_reference_id=${userId}`);
      expect(linkStudentP).toContain(`client_reference_id=${userId}`);
    });

    test("should handle special characters in userId", () => {
      const userId = "user-123_test@example";
      const link = generatePaymentLink(userId, "STUDENT");
      
      expect(link).toContain(`client_reference_id=${userId}`);
    });

    test("should generate different links for different plans", () => {
      const userId = "user123";
      const linkStudent = generatePaymentLink(userId, "STUDENT");
      const linkStudentP = generatePaymentLink(userId, "STUDENT_P");
      
      expect(linkStudent).not.toBe(linkStudentP);
      expect(linkStudent).toContain("test_9AQdUw0QVdLZ3Ic14a");
      expect(linkStudentP).toContain("test_fZe17K2Z3dLZ2E8aEL");
    });
  });
});
