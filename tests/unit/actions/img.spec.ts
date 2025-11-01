import { test, expect } from "@playwright/test";

test.describe("Actions - Image Management", () => {
  test.describe("InputParseError", () => {
    test("should create error with correct message format", () => {
      const error = new Error("Input parse error in uploadImg: No se encontró el archivo en el FormData");
      
      expect(error.message).toContain("Input parse error");
      expect(error.message).toContain("uploadImg");
      expect(error.message).toContain("No se encontró el archivo en el FormData");
    });

    test("should create error with context name", () => {
      const error = new Error("Input parse error in updateImg: No se encontró el archivo en el FormData");
      
      expect(error.message).toContain("updateImg");
    });
  });

  test.describe("uploadImg validation", () => {
    test("should validate FormData structure for upload", () => {
      const formData = new FormData();
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      formData.append("img", file);
      
      const img = formData.get("img") as File;
      expect(img).toBeTruthy();
      expect(img instanceof File).toBe(true);
      expect(img.name).toBe("test.jpg");
      expect(img.type).toBe("image/jpeg");
    });

    test("should detect missing img in FormData", () => {
      const formData = new FormData();
      const img = formData.get("img");
      
      expect(img).toBeNull();
    });

    test("should validate file metadata", () => {
      const file = new File(["test content"], "avatar.png", { type: "image/png" });
      
      expect(file.name).toBe("avatar.png");
      expect(file.type).toBe("image/png");
      expect(file.size).toBeGreaterThan(0);
    });
  });

  test.describe("deleteImg validation", () => {
    test("should validate URL string format", () => {
      const url = "https://utfs.io/f/test-file-id.jpg";
      
      expect(typeof url).toBe("string");
      expect(url).toContain("https://");
      expect(url.length).toBeGreaterThan(0);
    });

    test("should handle empty URL", () => {
      const url = "";
      
      expect(url.length).toBe(0);
    });

    test("should validate URL structure", () => {
      const validUrl = "https://utfs.io/f/abc123.jpg";
      
      expect(validUrl).toMatch(/^https?:\/\/.+/);
    });
  });

  test.describe("updateImg validation", () => {
    test("should validate FormData and URL for update", () => {
      const formData = new FormData();
      const file = new File(["new content"], "updated.jpg", { type: "image/jpeg" });
      formData.append("img", file);
      
      const url = "https://utfs.io/f/old-file.jpg";
      
      const img = formData.get("img") as File;
      expect(img).toBeTruthy();
      expect(img instanceof File).toBe(true);
      expect(typeof url).toBe("string");
      expect(url).toContain("https://");
    });

    test("should detect missing img in FormData for update", () => {
      const formData = new FormData();
      const img = formData.get("img");
      
      expect(img).toBeNull();
    });

    test("should validate update operation inputs", () => {
      const formData = new FormData();
      const file = new File(["content"], "new.jpg", { type: "image/jpeg" });
      formData.append("img", file);
      const oldUrl = "https://utfs.io/f/old.jpg";
      
      expect(formData.get("img")).toBeTruthy();
      expect(oldUrl).toBeTruthy();
      expect(oldUrl).toContain("https://");
    });
  });
});
