import { describe, expect, it } from "vitest";
import keystaticConfig from "@/keystatic.config";

const EXPECTED_COLLECTIONS = [
  "school",
  "student",
  "project",
  "activity",
  "blogPost",
  "successStory",
  "testimonial",
  "galleryImage",
  "boardMember",
] as const;

const EXPECTED_SINGLETONS = [
  "siteSettings",
  "statsSnapshot",
  "donorsPage",
  "donatePage",
  "contactPage",
  "termsPage",
  "navigation",
  "footer",
] as const;

describe("keystatic config", () => {
  it("registers all 9 collections per CONTENT-MODEL.md", () => {
    const keys = Object.keys(keystaticConfig.collections ?? {}).sort();
    expect(keys).toEqual([...EXPECTED_COLLECTIONS].sort());
  });

  it("registers all 8 singletons per CONTENT-MODEL.md", () => {
    const keys = Object.keys(keystaticConfig.singletons ?? {}).sort();
    expect(keys).toEqual([...EXPECTED_SINGLETONS].sort());
  });

  it("each singleton writes to a kebab-case content/<key> path", () => {
    const singletons = keystaticConfig.singletons ?? {};
    for (const [_, def] of Object.entries(singletons)) {
      expect(def.path).toMatch(/^content\/[a-z-]+$/);
    }
  });

  it("uses local storage in v1 (raw git workflow)", () => {
    expect(keystaticConfig.storage.kind).toBe("local");
  });

  it("brands the admin with the org name", () => {
    expect(keystaticConfig.ui?.brand?.name).toBe("Bridging Generations");
  });

  it("each collection writes under content/<collection>/*", () => {
    const collections = keystaticConfig.collections ?? {};
    for (const [_, def] of Object.entries(collections)) {
      expect(def.path).toMatch(/^content\/[a-z-]+\/\*$/);
    }
  });

  it("blog and success-story bodies use mdx with image directories under public/", () => {
    const blog = keystaticConfig.collections?.blogPost;
    const success = keystaticConfig.collections?.successStory;
    expect(blog?.format).toEqual({ contentField: "body" });
    expect(success?.format).toEqual({ contentField: "body" });
  });
});
