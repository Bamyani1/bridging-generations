import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function FormSection() {
  return (
    <section id="forms" className="scroll-mt-8">
      <h2 className="text-heading-2">Forms</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Field composes label + primitive + hint or error. Error region uses{" "}
        <code className="font-mono">role="alert"</code> and{" "}
        <code className="font-mono">aria-live="polite"</code>; helper copy uses the safer
        accent-2-text per DESIGN-SYSTEM.md §12.
      </p>
      <div className="mt-6 grid max-w-xl gap-6">
        <Field label="Name">{(props) => <Input {...props} placeholder="Your name" />}</Field>
        <Field label="Email" hint="We'll only use this to reply.">
          {(props) => <Input {...props} type="email" placeholder="you@example.com" />}
        </Field>
        <Field label="Subject" error="Subject is required.">
          {(props) => <Input {...props} required />}
        </Field>
        <Field label="Topic">
          {(props) => (
            <Select {...props} defaultValue="general">
              <option value="general">General</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="press">Press</option>
            </Select>
          )}
        </Field>
        <Field label="Message" hint="Up to 1000 characters.">
          {(props) => <Textarea {...props} rows={5} placeholder="Tell us more…" />}
        </Field>
      </div>
    </section>
  );
}
