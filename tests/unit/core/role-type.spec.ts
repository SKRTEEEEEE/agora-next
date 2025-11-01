import { test, expect } from "@playwright/test";
import { RoleType, apiRoleType, RoleHierarchy } from "@/core/domain/entities/role.type";

test.describe("Core Domain - Role Type", () => {
  test.describe("RoleType enum", () => {
    test("should have ADMIN role", () => {
      expect(RoleType.ADMIN).toBe("ADMIN");
    });

    test("should have STUDENT role", () => {
      expect(RoleType.STUDENT).toBe("STUDENT");
    });

    test("should have STUDENT_PRO role", () => {
      expect(RoleType.STUDENT_PRO).toBe("STUDENT_P");
    });

    test("should have exactly 3 roles", () => {
      const roles = Object.keys(RoleType);
      expect(roles.length).toBe(3);
    });

    test("should contain all expected role values", () => {
      const values = Object.values(RoleType);
      expect(values).toContain("ADMIN");
      expect(values).toContain("STUDENT");
      expect(values).toContain("STUDENT_P");
    });

    test("should have unique role values", () => {
      const values = Object.values(RoleType);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });
  });

  test.describe("apiRoleType", () => {
    test("should have correct enum property", () => {
      expect(apiRoleType.enum).toBe(RoleType);
    });

    test("should have correct enumName", () => {
      expect(apiRoleType.enumName).toBe("RoleType");
    });

    test("should have description", () => {
      expect(apiRoleType.description).toBe("The Role permission type for a User");
    });

    test("should have title", () => {
      expect(apiRoleType.title).toBe("Role Type");
    });

    test("should have ADMIN as example", () => {
      expect(apiRoleType.example).toBe(RoleType.ADMIN);
    });

    test("should have all required properties", () => {
      expect(apiRoleType).toHaveProperty("enum");
      expect(apiRoleType).toHaveProperty("enumName");
      expect(apiRoleType).toHaveProperty("description");
      expect(apiRoleType).toHaveProperty("title");
      expect(apiRoleType).toHaveProperty("example");
    });
  });

  test.describe("RoleHierarchy", () => {
    test("should have hierarchy for ADMIN", () => {
      expect(RoleHierarchy[RoleType.ADMIN]).toBe(1);
    });

    test("should have hierarchy for STUDENT_PRO", () => {
      expect(RoleHierarchy[RoleType.STUDENT_PRO]).toBe(2);
    });

    test("should have hierarchy for STUDENT", () => {
      expect(RoleHierarchy[RoleType.STUDENT]).toBe(3);
    });

    test("should have ADMIN as highest priority (lowest number)", () => {
      const adminPriority = RoleHierarchy[RoleType.ADMIN];
      const studentPriority = RoleHierarchy[RoleType.STUDENT];
      const studentProPriority = RoleHierarchy[RoleType.STUDENT_PRO];
      
      expect(adminPriority).toBeLessThan(studentProPriority);
      expect(adminPriority).toBeLessThan(studentPriority);
    });

    test("should have STUDENT_PRO higher than STUDENT", () => {
      const studentProPriority = RoleHierarchy[RoleType.STUDENT_PRO];
      const studentPriority = RoleHierarchy[RoleType.STUDENT];
      
      expect(studentProPriority).toBeLessThan(studentPriority);
    });

    test("should have correct hierarchy order", () => {
      const priorities = [
        RoleHierarchy[RoleType.ADMIN],
        RoleHierarchy[RoleType.STUDENT_PRO],
        RoleHierarchy[RoleType.STUDENT]
      ];
      
      expect(priorities[0]).toBe(1);
      expect(priorities[1]).toBe(2);
      expect(priorities[2]).toBe(3);
    });

    test("should have hierarchy for all roles", () => {
      const roles = Object.values(RoleType);
      roles.forEach(role => {
        expect(RoleHierarchy[role]).toBeDefined();
        expect(typeof RoleHierarchy[role]).toBe("number");
      });
    });

    test("should have positive integer hierarchy values", () => {
      Object.values(RoleHierarchy).forEach(value => {
        expect(value).toBeGreaterThan(0);
        expect(Number.isInteger(value)).toBe(true);
      });
    });

    test("should have unique hierarchy values", () => {
      const values = Object.values(RoleHierarchy);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });
  });

  test.describe("Role hierarchy comparisons", () => {
    test("should allow comparison between roles", () => {
      const isAdminHigher = RoleHierarchy[RoleType.ADMIN] < RoleHierarchy[RoleType.STUDENT];
      expect(isAdminHigher).toBe(true);
    });

    test("should correctly order all roles", () => {
      const roles = [RoleType.STUDENT, RoleType.ADMIN, RoleType.STUDENT_PRO];
      const sorted = roles.sort((a, b) => RoleHierarchy[a] - RoleHierarchy[b]);
      
      expect(sorted[0]).toBe(RoleType.ADMIN);
      expect(sorted[1]).toBe(RoleType.STUDENT_PRO);
      expect(sorted[2]).toBe(RoleType.STUDENT);
    });

    test("should identify highest role", () => {
      const roles = Object.values(RoleType);
      const highestRole = roles.reduce((prev, curr) => 
        RoleHierarchy[prev] < RoleHierarchy[curr] ? prev : curr
      );
      
      expect(highestRole).toBe(RoleType.ADMIN);
    });

    test("should identify lowest role", () => {
      const roles = Object.values(RoleType);
      const lowestRole = roles.reduce((prev, curr) => 
        RoleHierarchy[prev] > RoleHierarchy[curr] ? prev : curr
      );
      
      expect(lowestRole).toBe(RoleType.STUDENT);
    });
  });
});
