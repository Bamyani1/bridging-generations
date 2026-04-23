import { fields, singleton } from "@keystatic/core";

export const footerSingleton = singleton({
  label: "Footer",
  path: "content/footer",
  schema: {
    columns: fields.array(
      fields.object({
        heading: fields.text({
          label: "Heading",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        links: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
              validation: { isRequired: true, length: { min: 1 } },
            }),
            href: fields.text({
              label: "URL",
              validation: { isRequired: true, length: { min: 1 } },
            }),
          }),
          {
            label: "Links",
            itemLabel: (props) => props.fields.label.value || "Link",
          },
        ),
      }),
      {
        label: "Columns",
        description: "2 to 4 columns.",
        itemLabel: (props) => props.fields.heading.value || "Column",
        validation: { length: { min: 2, max: 4 } },
      },
    ),
    copyrightNote: fields.text({
      label: "Copyright note",
      validation: { isRequired: true, length: { min: 1 } },
    }),
    legalLinks: fields.array(
      fields.object({
        label: fields.text({
          label: "Label",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        href: fields.text({
          label: "URL",
          validation: { isRequired: true, length: { min: 1 } },
        }),
      }),
      {
        label: "Legal links",
        description: "Terms, privacy, etc.",
        itemLabel: (props) => props.fields.label.value || "Link",
      },
    ),
  },
});
