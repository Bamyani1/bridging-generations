import { fields, singleton } from "@keystatic/core";

export const navigationSingleton = singleton({
  label: "Navigation",
  path: "content/navigation/",
  schema: {
    primaryLinks: fields.array(
      fields.object({
        label: fields.text({
          label: "Label",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        href: fields.text({
          label: "URL",
          description: "Internal path or full URL.",
          validation: { isRequired: true, length: { min: 1 } },
        }),
      }),
      {
        label: "Primary links",
        description: "Up to 6 items.",
        itemLabel: (props) => props.fields.label.value || "Link",
        validation: { length: { max: 6 } },
      },
    ),
    donateLabel: fields.text({
      label: "Donate CTA label",
      description: "Right-side CTA in the nav.",
      validation: { isRequired: true, length: { min: 1 } },
    }),
  },
});
