import { collection, fields } from "@keystatic/core";
import { imageWithAlt } from "../fields";

export const galleryImageCollection = collection({
  label: "Gallery images",
  path: "content/gallery/*",
  slugField: "caption",
  columns: ["takenAt", "location"],
  schema: {
    caption: fields.slug({
      name: {
        label: "Caption (also used as slug)",
        validation: { isRequired: true, length: { min: 1 } },
      },
      slug: { label: "Slug" },
    }),
    image: imageWithAlt({ label: "Image", dir: "gallery", required: true }),
    takenAt: fields.date({ label: "Taken on" }),
    location: fields.text({ label: "Location" }),
  },
});
