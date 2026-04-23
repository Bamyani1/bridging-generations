import { fields } from "@keystatic/core";

const ALT_HELP =
  'Describe the image for screen readers and low-bandwidth users. Be specific. Do not start with "Image of...".';

export function imageWithAlt({
  label,
  dir,
  required = true,
}: {
  label: string;
  dir: string;
  required?: boolean;
}) {
  const directory = `public/images/${dir}`;
  const publicPath = `/images/${dir}/`;
  if (required) {
    return fields.object(
      {
        src: fields.image({
          label: `${label} — file`,
          directory,
          publicPath,
          validation: { isRequired: true },
        }),
        alt: fields.text({
          label: `${label} — alt text`,
          description: ALT_HELP,
          validation: { isRequired: true, length: { min: 1 } },
        }),
      },
      { label },
    );
  }
  return fields.object(
    {
      src: fields.image({
        label: `${label} — file`,
        directory,
        publicPath,
      }),
      alt: fields.text({
        label: `${label} — alt text`,
        description: ALT_HELP,
      }),
    },
    { label },
  );
}
