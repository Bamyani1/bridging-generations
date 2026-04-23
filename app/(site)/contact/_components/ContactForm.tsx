"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactForm } from "../actions";
import { type ContactActionState, initialContactState } from "../actions.types";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-accent-2 px-6 py-3 text-white shadow-[var(--shadow-cta)] transition hover:bg-accent-2-hover focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50"
    >
      <span className="text-[19px] font-bold leading-none">
        {pending ? "Sending…" : "Send message"}
      </span>
    </button>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(
    submitContactForm,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col gap-3 bg-ground-2 p-8">
        <h2 className="text-heading-4 text-ink">Thank you.</h2>
        <p className="text-body text-ink-2">{state.message}</p>
      </div>
    );
  }

  const fieldErrors = state.fieldErrors ?? {};
  const errorKeys = Object.keys(fieldErrors);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5" aria-busy={pending}>
      {state.status === "error" ? (
        <div role="alert" className="flex flex-col gap-2 border border-accent-2 p-4 text-body">
          <p className="text-ink">{state.message}</p>
          {errorKeys.length > 0 ? (
            <ul className="list-disc pl-6 text-ink-2">
              {errorKeys.map((k) => {
                const label = k === "name" ? "Name" : k === "email" ? "Email" : "Message";
                return (
                  <li key={k}>
                    {label}: {fieldErrors[k as keyof typeof fieldErrors]}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ) : null}

      <Field label="Your name" error={fieldErrors.name}>
        {(fieldProps) => (
          <Input
            {...fieldProps}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
          />
        )}
      </Field>

      <Field label="Your email" error={fieldErrors.email}>
        {(fieldProps) => (
          <Input {...fieldProps} name="email" type="email" autoComplete="email" required />
        )}
      </Field>

      <Field label="Message" error={fieldErrors.message}>
        {(fieldProps) => (
          <Textarea {...fieldProps} name="message" rows={6} maxLength={2000} required />
        )}
      </Field>

      {/* Honeypot — hidden from real users, filled by bots */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="contact-company">
          Company
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <SubmitButton pending={pending} />
    </form>
  );
}
