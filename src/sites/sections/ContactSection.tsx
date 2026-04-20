import { Phone, Mail, MapPin, Clock, type LucideIcon } from "lucide-react";
import type { ContactSection as ContactSectionType, ContactDetail } from "../types";
import { SectionShell, SectionHeading } from "./SectionShell";
import { toast } from "sonner";
import { FormEvent } from "react";

const iconMap: Record<ContactDetail["type"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
};

function ContactList({ details }: { details: ContactDetail[] }) {
  return (
    <div className="space-y-4">
      {details.map((d, i) => {
        const Icon = iconMap[d.type];
        return (
          <div key={i} className="flex gap-4">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: "hsl(var(--site-accent) / 0.12)", color: "hsl(var(--site-accent))" }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--site-text-muted))]">{d.label}</p>
              <p className="text-sm font-medium mt-0.5">{d.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent — we'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.08)] bg-[hsl(var(--site-surface))] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" required />
        <Field label="Email" type="email" required />
      </div>
      <Field label="Subject" />
      <label className="block">
        <span className="block text-xs font-semibold mb-1.5">Message</span>
        <textarea
          required
          rows={4}
          className="w-full rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.12)] bg-[hsl(var(--site-background))] px-3 py-2 text-sm focus:outline-none focus:border-[hsl(var(--site-accent))]"
        />
      </label>
      <button
        type="submit"
        className="h-11 w-full rounded-[var(--site-radius)] text-white text-sm font-semibold shadow-md hover:shadow-lg transition"
        style={{ background: "linear-gradient(135deg, hsl(var(--site-primary)), hsl(var(--site-accent)))" }}
      >
        Send message
      </button>
    </form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1.5">{label}</span>
      <input
        {...props}
        className="h-10 w-full rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.12)] bg-[hsl(var(--site-background))] px-3 text-sm focus:outline-none focus:border-[hsl(var(--site-accent))]"
      />
    </label>
  );
}

export function ContactSection({ section }: { section: ContactSectionType }) {
  const invert = section.background === "brand" || section.background === "aurora";

  if (section.variant === "cards") {
    return (
      <SectionShell section={section}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {section.details.map((d, i) => {
            const Icon = iconMap[d.type];
            return (
              <div key={i} className="rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.08)] bg-[hsl(var(--site-surface))] p-6">
                <Icon className="h-5 w-5 text-[hsl(var(--site-accent))]" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--site-text-muted))]">{d.label}</p>
                <p className="mt-1 text-sm font-semibold">{d.value}</p>
              </div>
            );
          })}
        </div>
      </SectionShell>
    );
  }

  if (section.variant === "stacked") {
    return (
      <SectionShell section={section}>
        <div className="max-w-2xl mx-auto">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} align="center" invert={invert} />
          <ContactList details={section.details} />
          {section.showForm && <div className="mt-8"><ContactForm /></div>}
        </div>
      </SectionShell>
    );
  }

  // split
  return (
    <SectionShell section={section}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle} invert={invert} />
          <ContactList details={section.details} />
          {section.mapEmbedUrl && (
            <iframe
              title="map"
              src={section.mapEmbedUrl}
              className="mt-8 w-full h-64 rounded-[var(--site-radius)] border border-[hsl(var(--site-text)/0.08)]"
              loading="lazy"
            />
          )}
        </div>
        {section.showForm ? <ContactForm /> : null}
      </div>
    </SectionShell>
  );
}
