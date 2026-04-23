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
    givebutterAccountId: fields.text({
      label: "Givebutter account ID",
      description:
        "Your organization's Givebutter account ID — the value in the acct= query param on the widget script URL shown in the Givebutter dashboard embed code. Different from the campaign ID.",
      validation: { isRequired: true, length: { min: 1 } },
    }),
    givebutterCampaignId: fields.text({
      label: "Givebutter campaign ID",
      description:
        "Six-character campaign code — the value on the <givebutter-widget id=...> element in the dashboard embed code.",
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
