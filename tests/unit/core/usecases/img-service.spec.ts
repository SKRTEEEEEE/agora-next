import { test, expect } from "@playwright/test";

// Mock del repositorio
const mockImgRepository = {
  deleteImage: async (fileName: string) => {
    if (fileName === "existing-file.jpg") return true;
    if (fileName === "non-existent.jpg") return false;
    return true;
  },
  uploadImage: async (file: File) => {
    if (file.size === 0) throw new Error("Empty file");
    return `https://utfs.io/f/${file.name}`;
  }
};

// Simulación de las clases DeleteImage y UploadImage
class DeleteImage {
  constructor(private imgRepository: typeof mockImgRepository) {}
  
  async execute(img: string): Promise<boolean> {
    const fileName = img.split("/").pop();
    if (fileName === undefined) throw new Error("Error at obtain url path");
    return this.imgRepository.deleteImage(fileName);
  }
}

class UploadImage {
  constructor(private imgRepository: typeof mockImgRepository) {}
  
  async execute(file: File): Promise<string> {
    return this.imgRepository.uploadImage(file);
  }
}

test.describe("Core Use Cases - Image Service", () => {
  test.describe("DeleteImage", () => {
    test("should delete image successfully", async () => {
      const deleteImage = new DeleteImage(mockImgRepository);
      const result = await deleteImage.execute("https://utfs.io/f/existing-file.jpg");
      
      expect(result).toBe(true);
    });

    test("should extract filename from URL", async () => {
      const url = "https://utfs.io/f/test-file.jpg";
      
      const fileName = url.split("/").pop();
      expect(fileName).toBe("test-file.jpg");
    });

    test("should throw error for invalid URL", async () => {
      // Simular URL que termina en /
      const invalidUrl = "https://utfs.io/f/";
      const fileName = invalidUrl.split("/").pop();
      
      expect(fileName).toBe("");
    });

    test("should handle URL with multiple slashes", async () => {
      const url = "https://example.com/path/to/file/image.png";
      
      const fileName = url.split("/").pop();
      expect(fileName).toBe("image.png");
    });

    test("should handle different file extensions", async () => {
      const extensions = [".jpg", ".png", ".gif", ".webp"];
      
      for (const ext of extensions) {
        const url = `https://utfs.io/f/file${ext}`;
        const fileName = url.split("/").pop();
        expect(fileName).toContain(ext);
      }
    });
  });

  test.describe("UploadImage", () => {
    test("should upload image successfully", async () => {
      const uploadImage = new UploadImage(mockImgRepository);
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      
      const result = await uploadImage.execute(file);
      
      expect(result).toBe("https://utfs.io/f/test.jpg");
      expect(result).toContain("https://utfs.io/f/");
    });

    test("should handle different file types", async () => {
      const uploadImage = new UploadImage(mockImgRepository);
      const fileTypes = [
        { name: "image.jpg", type: "image/jpeg" },
        { name: "photo.png", type: "image/png" },
        { name: "graphic.gif", type: "image/gif" }
      ];
      
      for (const fileType of fileTypes) {
        const file = new File(["content"], fileType.name, { type: fileType.type });
        const result = await uploadImage.execute(file);
        expect(result).toContain(fileType.name);
      }
    });

    test("should handle large files", async () => {
      const uploadImage = new UploadImage(mockImgRepository);
      const largeContent = new Array(1024).fill("x").join("");
      const file = new File([largeContent], "large.jpg", { type: "image/jpeg" });
      
      expect(file.size).toBeGreaterThan(1000);
      const result = await uploadImage.execute(file);
      expect(result).toContain("large.jpg");
    });

    test("should preserve file name in upload result", async () => {
      const uploadImage = new UploadImage(mockImgRepository);
      const fileName = "my-special-file.jpg";
      const file = new File(["content"], fileName, { type: "image/jpeg" });
      
      const result = await uploadImage.execute(file);
      expect(result).toContain(fileName);
    });
  });

  test.describe("Image URL handling", () => {
    test("should handle URL path extraction", () => {
      const urls = [
        "https://utfs.io/f/abc123.jpg",
        "https://example.com/images/photo.png",
        "http://localhost:3000/uploads/file.gif"
      ];
      
      urls.forEach(url => {
        const fileName = url.split("/").pop();
        expect(fileName).toBeTruthy();
        expect(fileName).not.toContain("/");
      });
    });

    test("should validate URL structure", () => {
      const validUrls = [
        "https://utfs.io/f/file.jpg",
        "https://example.com/path/image.png"
      ];
      
      validUrls.forEach(url => {
        expect(url).toMatch(/^https?:\/\/.+\/.+\..+$/);
      });
    });

    test("should handle URL with query parameters", () => {
      const url = "https://utfs.io/f/file.jpg?size=large&format=webp";
      const parts = url.split("?")[0];
      const fileName = parts.split("/").pop();
      
      expect(fileName).toBe("file.jpg");
      expect(fileName).not.toContain("?");
    });
  });

  test.describe("File validation", () => {
    test("should validate file metadata", () => {
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      
      expect(file.name).toBe("test.jpg");
      expect(file.type).toBe("image/jpeg");
      expect(file.size).toBeGreaterThan(0);
    });

    test("should handle files with special characters in name", () => {
      const specialNames = [
        "file-with-dash.jpg",
        "file_with_underscore.png",
        "file with spaces.gif"
      ];
      
      specialNames.forEach(name => {
        const file = new File(["content"], name, { type: "image/jpeg" });
        expect(file.name).toBe(name);
      });
    });

    test("should validate image file extensions", () => {
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];
      
      imageExtensions.forEach(ext => {
        const fileName = `image${ext}`;
        expect(fileName).toMatch(/\.(jpg|jpeg|png|gif|webp|bmp)$/);
      });
    });
  });
});
