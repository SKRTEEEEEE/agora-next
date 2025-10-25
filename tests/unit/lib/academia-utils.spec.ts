import { formatDate, sortPosts, getAllTags, sortTagsByCount, getPostsByTagSlug, type Ejercicio } from "@/lib/utils";
import { test, expect } from "@playwright/test";

test.describe("Academia Utils", () => {
  test.describe("formatDate()", () => {
    test("should format date string correctly", () => {
      const date = "2024-01-15";
      const formatted = formatDate(date);
      expect(formatted).toBe("January 15, 2024");
    });

    test("should format date number (timestamp) correctly", () => {
      const timestamp = new Date("2024-12-25").getTime();
      const formatted = formatDate(timestamp);
      expect(formatted).toBe("December 25, 2024");
    });

    test("should handle different months", () => {
      expect(formatDate("2024-03-10")).toBe("March 10, 2024");
      expect(formatDate("2024-07-04")).toBe("July 4, 2024");
    });
  });

  test.describe("sortPosts()", () => {
    const mockPosts: Ejercicio[] = [
      {
        slug: "/post1",
        slugAsParams: "post1",
        title: "Post 1",
        date: "2024-01-01",
        published: true,
        body: ""
      },
      {
        slug: "/post2",
        slugAsParams: "post2",
        title: "Post 2",
        date: "2024-03-01",
        published: true,
        body: ""
      },
      {
        slug: "/post3",
        slugAsParams: "post3",
        title: "Post 3",
        date: "2024-02-01",
        published: true,
        body: ""
      }
    ];

    test("should sort posts by date in descending order", () => {
      const sorted = sortPosts([...mockPosts]);
      expect(sorted[0].slug).toBe("/post2");
      expect(sorted[1].slug).toBe("/post3");
      expect(sorted[2].slug).toBe("/post1");
    });

    test("should not mutate original array", () => {
      const original = [...mockPosts];
      sortPosts(mockPosts);
      // Check that dates are still in original order
      expect(original[0].date).toBe("2024-01-01");
      expect(original[1].date).toBe("2024-03-01");
      expect(original[2].date).toBe("2024-02-01");
    });

    test("should handle empty array", () => {
      const sorted = sortPosts([]);
      expect(sorted).toEqual([]);
    });

    test("should handle single post", () => {
      const singlePost = mockPosts[0];
      const sorted = sortPosts([singlePost]);
      expect(sorted).toHaveLength(1);
      expect(sorted[0].slug).toBe(singlePost.slug);
    });
  });

  test.describe("getAllTags()", () => {
    const mockPostsWithTags: Ejercicio[] = [
      {
        slug: "/post1",
        slugAsParams: "post1",
        title: "Post 1",
        date: "2024-01-01",
        published: true,
        tags: ["javascript", "react"],
        body: ""
      },
      {
        slug: "/post2",
        slugAsParams: "post2",
        title: "Post 2",
        date: "2024-02-01",
        published: true,
        tags: ["javascript", "typescript"],
        body: ""
      },
      {
        slug: "/post3",
        slugAsParams: "post3",
        title: "Post 3",
        date: "2024-03-01",
        published: false,
        tags: ["python"],
        body: ""
      },
      {
        slug: "/post4",
        slugAsParams: "post4",
        title: "Post 4",
        date: "2024-04-01",
        published: true,
        tags: ["javascript"],
        body: ""
      }
    ];

    test("should count tags correctly", () => {
      const tags = getAllTags(mockPostsWithTags);
      expect(tags["javascript"]).toBe(3);
      expect(tags["react"]).toBe(1);
      expect(tags["typescript"]).toBe(1);
    });

    test("should ignore unpublished posts", () => {
      const tags = getAllTags(mockPostsWithTags);
      expect(tags["python"]).toBeUndefined();
    });

    test("should handle posts without tags", () => {
      const postsNoTags: Ejercicio[] = [
        {
          slug: "/post1",
          slugAsParams: "post1",
          title: "Post 1",
          date: "2024-01-01",
          published: true,
          body: ""
        }
      ];
      const tags = getAllTags(postsNoTags);
      expect(Object.keys(tags)).toHaveLength(0);
    });

    test("should handle empty posts array", () => {
      const tags = getAllTags([]);
      expect(tags).toEqual({});
    });
  });

  test.describe("sortTagsByCount()", () => {
    test("should sort tags by count in descending order", () => {
      const tags = {
        "javascript": 5,
        "react": 2,
        "typescript": 3,
        "nextjs": 1
      };
      const sorted = sortTagsByCount(tags);
      expect(sorted).toEqual(["javascript", "typescript", "react", "nextjs"]);
    });

    test("should handle single tag", () => {
      const tags = { "javascript": 1 };
      const sorted = sortTagsByCount(tags);
      expect(sorted).toEqual(["javascript"]);
    });

    test("should handle empty tags object", () => {
      const sorted = sortTagsByCount({});
      expect(sorted).toEqual([]);
    });

    test("should handle tags with same count", () => {
      const tags = {
        "javascript": 3,
        "react": 3,
        "typescript": 3
      };
      const sorted = sortTagsByCount(tags);
      expect(sorted).toHaveLength(3);
      // All should be present
      expect(sorted).toContain("javascript");
      expect(sorted).toContain("react");
      expect(sorted).toContain("typescript");
    });
  });

  test.describe("getPostsByTagSlug()", () => {
    const mockPostsForTagFilter: Ejercicio[] = [
      {
        slug: "/post1",
        slugAsParams: "post1",
        title: "Post 1",
        date: "2024-01-01",
        published: true,
        tags: ["JavaScript", "React"],
        body: ""
      },
      {
        slug: "/post2",
        slugAsParams: "post2",
        title: "Post 2",
        date: "2024-02-01",
        published: true,
        tags: ["TypeScript"],
        body: ""
      },
      {
        slug: "/post3",
        slugAsParams: "post3",
        title: "Post 3",
        date: "2024-03-01",
        published: true,
        tags: ["JavaScript"],
        body: ""
      },
      {
        slug: "/post4",
        slugAsParams: "post4",
        title: "Post 4",
        date: "2024-04-01",
        published: true,
        body: ""
      }
    ];

    test("should filter posts by tag slug", () => {
      const filtered = getPostsByTagSlug(mockPostsForTagFilter, "javascript");
      expect(filtered).toHaveLength(2);
      expect(filtered[0].slug).toBe("/post1");
      expect(filtered[1].slug).toBe("/post3");
    });

    test("should handle tag names with spaces", () => {
      const postsWithSpaces: Ejercicio[] = [
        {
          slug: "/post1",
          slugAsParams: "post1",
          title: "Post 1",
          date: "2024-01-01",
          published: true,
          tags: ["Web Development"],
          body: ""
        }
      ];
      const filtered = getPostsByTagSlug(postsWithSpaces, "web-development");
      expect(filtered).toHaveLength(1);
    });

    test("should return empty array when no posts match", () => {
      const filtered = getPostsByTagSlug(mockPostsForTagFilter, "python");
      expect(filtered).toEqual([]);
    });

    test("should filter out posts without tags", () => {
      const filtered = getPostsByTagSlug(mockPostsForTagFilter, "nonexistent");
      expect(filtered).toEqual([]);
    });

    test("should handle empty posts array", () => {
      const filtered = getPostsByTagSlug([], "javascript");
      expect(filtered).toEqual([]);
    });
  });
});
