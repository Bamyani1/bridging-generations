import { fields, singleton } from "@keystatic/core";

export const donatePageSingleton = singleton({
  label: "Donate page",
  path: "content/donate-page/",
  schema: {
    headline: fields.text({
      label: "Headline",
      validation: { isRequired: true, length: { min: 1 } },
    }),
    intro: fields.text({
      label: "Intro",
      multiline: true,
      validation: { isRequired: true, length: { min: 1 } },
    }),
    givebutterCampaignId: fields.text({
      label: "Givebutter campaign ID",
      description: "ID of the Givebutter campaign embedded on the donate page.",
      validation: { isRequired: true, length: { min: 1 } },
    }),
    monthlySuggestion: fields.integer({
      label: "Monthly suggestion (USD)",
      description: 'e.g. 30 — used in CTAs like "$30/month sponsors one student".',
      validation: { min: 0 },
    }),
    afterDonateNote: fields.text({
      label: "After-donate note",
      description: "Shown below the embed.",
      multiline: true,
    }),
    thankYouBody: fields.text({
      label: "Thank-you body",
      description:
        "Body copy for /donate/thank-you. Avoid assuming donation completion — some visitors type the URL without donating.",
      multiline: true,
      validation: { isRequired: true, length: { min: 1 } },
    }),
    faq: fields.array(
      fields.object({
        question: fields.text({
          label: "Question",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        answer: fields.text({
          label: "Answer",
          multiline: true,
          validation: { isRequired: true, length: { min: 1 } },
        }),
      }),
      {
        label: "FAQ",
        description:
          "4–6 items on tax deductibility, processing fees, how the money is used, recurring cancellation, etc.",
        itemLabel: (props) => props.fields.question.value.slice(0, 80) || "Question",
      },
    ),
  },
});
