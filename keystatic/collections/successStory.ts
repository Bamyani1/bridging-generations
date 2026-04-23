import { collection, fields } from "@keystatic/core";
import { imageWithAlt } from "../fields";

export const successStoryCollection = collection({
  label: "Success stories",
  path: "content/success-stories/*",
  slugField: "subjectName",
  format: { contentField: "body" },
  columns: ["publishedAt", "published"],
  schema: {
    subjectName: fields.slug({
      name: {
        label: "Subject name",
        description:
          "First name only for current students. Full name allowed for alums (18+) with written consent.",
        validation: { isRequired: true, length: { min: 1 } },
      },
      slug: { label: "Slug", description: "URL: /success-stories/<slug>" },
    }),
    subjectRole: fields.text({
      label: "Subject role",
      description: 'e.g. "10th Grade, Bandarban".',
    }),
    pullQuote: fields.text({
      label: "Pull quote",
      description: "Featured quote on the story card.",
      multiline: true,
      validation: { isRequired: true, length: { min: 1 } },
    }),
    body: fields.mdx({
      label: "Body",
      options: {
        image: {
          directory: "public/images/success-stories",
          publicPath: "/images/success-stories/",
        },
      },
    }),
    portrait: imageWithAlt({ label: "Portrait", dir: "success-stories", required: true }),
    linkedStudentId: fields.relationship({
      label: "Linked student",
      collection: "student",
      description:
        "When set, the consent gate (storyReleaseStatus + consentScope including website) is enforced at build.",
    }),
    published: fields.checkbox({
      label: "Published",
      description: "Draft gate. Off keeps the story out of the public site.",
      defaultValue: false,
    }),
    publishedAt: fields.date({
      label: "Published on",
      validation: { isRequired: true },
    }),
    metaTitle: fields.text({
      label: "Meta title (SEO override)",
      description: "Falls back to subjectName + site title pattern when empty.",
    }),
    metaDescription: fields.text({
      label: "Meta description (SEO override)",
      description: "Falls back to the auto-derived description when empty.",
      multiline: true,
    }),
    ogImageOverride: imageWithAlt({
      label: "OG image override",
      dir: "success-stories",
      required: false,
    }),
  },
});
