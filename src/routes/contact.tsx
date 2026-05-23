import { useState, forwardRef, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

import { SiteLayout } from "@/components/SiteLayout";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { AuroraShader } from "@/components/AuroraShader";
import { COMPANY, CONTACT_SERVICES } from "@/lib/content";
import {
  submitContactForm,
  contactSchema,
  type ContactInput,
} from "@/lib/contact-action";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${COMPANY.name}` },
      {
        name: "description",
        content:
          "Tell GrayBit Labs about your project. We respond within one business day with a clear perspective and concrete next steps.",
      },
      { property: "og:title", content: `Contact | ${COMPANY.name}` },
      {
        property: "og:description",
        content: "Start a conversation with the GrayBit Labs engineering team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { services: "" },
  });

  function toggleService(s: string) {
    setSelectedServices((prev) => {
      const next = prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s];
      setValue("services", next.join(", "), { shouldValidate: true });
      return next;
    });
  }

  async function onSubmit(data: ContactInput) {
    await submitContactForm({ data });
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pt-24 md:pt-36 pb-12 grid-pattern overflow-hidden">
        <AuroraShader className="opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-5">
              Contact
            </p>
          </SectionReveal>
          <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight max-w-4xl leading-[1.05]">
            <SplitText
              text="Tell us what you're"
              split="word"
              stagger={0.06}
              className="block text-silver"
            />
            <SplitText
              text="building."
              split="word"
              stagger={0.06}
              delay={0.3}
              className="block text-electric"
            />
          </h1>
          <SectionReveal delay={500}>
            <p className="mt-7 max-w-2xl text-foreground/70 text-base md:text-lg leading-relaxed">
              We respond within one business day. If your project isn't a fit,
              we'll tell you why and point you toward someone who can help.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Sidebar */}
          <SectionReveal className="lg:col-span-5 space-y-7" direction="left">
            {/* Email block */}
            <ContactRow icon={Mail} label="Email">
              <a
                href={`mailto:${COMPANY.email}`}
                data-cursor="grow"
                className="font-display text-2xl md:text-3xl tracking-tight text-silver hover:text-electric transition-all duration-300 break-all"
              >
                {COMPANY.email}
              </a>
            </ContactRow>

            {/* Phone blocks */}
            <ContactRow icon={Phone} label="Call us">
              <ul className="space-y-2">
                {COMPANY.phones.map((p) => (
                  <li
                    key={p.href}
                    className="flex flex-wrap items-center justify-between gap-3 group"
                  >
                    <a
                      href={p.href}
                      data-cursor="grow"
                      className="font-mono text-base md:text-lg text-foreground hover:text-accent transition-colors duration-200"
                    >
                      {p.display}
                    </a>
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="grow"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-400/80 hover:text-emerald-300 transition-colors"
                    >
                      <MessageCircle className="size-3.5" />
                      WhatsApp
                    </a>
                  </li>
                ))}
              </ul>
            </ContactRow>

            {/* Response time */}
            <ContactRow icon={Clock} label="Response time">
              <p className="text-foreground/90 leading-relaxed text-sm">
                Within one business day.{" "}
                <span className="text-muted-foreground">Usually much faster.</span>
              </p>
            </ContactRow>

            {/* Location */}
            <ContactRow icon={MapPin} label="Where we operate">
              <p className="text-foreground/90 leading-relaxed text-sm">
                {COMPANY.location}{" "}
                <span className="text-muted-foreground">
                  We've worked with clients across the US, UK, EU, and APAC.
                </span>
              </p>
            </ContactRow>

            {/* Socials */}
            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
                Follow along
              </p>
              <div className="flex flex-wrap gap-3">
                <SocialPill icon={Linkedin} href={COMPANY.linkedin}>
                  LinkedIn
                </SocialPill>
                <SocialPill icon={Instagram} href={COMPANY.instagram}>
                  Instagram
                </SocialPill>
              </div>
            </div>
          </SectionReveal>

          {/* Form */}
          <SectionReveal className="lg:col-span-7" direction="right" delay={100}>
            {submitted ? (
              <SuccessCard />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="relative border border-border rounded-3xl p-7 md:p-10 bg-card/40 backdrop-blur-md space-y-7 overflow-hidden"
              >
                {/* Subtle inner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 60%)",
                  }}
                />

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatField id="name" label="Your name" error={errors.name?.message} {...register("name")} />
                  <FloatField id="email" label="Work email" type="email" error={errors.email?.message} {...register("email")} />
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FloatField id="company" label="Company (optional)" {...register("company")} />
                  <FloatField id="budget" label="Approx. budget (optional)" {...register("budget")} />
                </div>

                {/* Services */}
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    What can we help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_SERVICES.map((s) => {
                      const active = selectedServices.includes(s);
                      return (
                        <motion.button
                          type="button"
                          key={s}
                          onClick={() => toggleService(s)}
                          whileTap={{ scale: 0.96 }}
                          data-cursor="grow"
                          className={`px-3.5 py-1.5 rounded-full text-[13px] border transition-all duration-200 ${
                            active
                              ? "border-accent bg-accent/15 text-accent shadow-[0_0_18px_-4px_rgba(61,126,255,0.6)]"
                              : "border-border text-foreground/70 hover:border-accent/40 hover:text-foreground"
                          }`}
                        >
                          {active && <span className="mr-1 text-accent">✓</span>}
                          {s}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="relative field-float">
                  <textarea
                    id="message"
                    placeholder=" "
                    {...register("message")}
                  />
                  <label htmlFor="message">Project brief</label>
                  {errors.message && <p className="err">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div className="relative flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground max-w-xs">
                    No spam, no sales calls. Just an engineer reading your brief.
                  </p>
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor="grow"
                      className="btn-accent inline-flex items-center gap-2 px-7 py-4 text-sm shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowUpRight className="size-4" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────── */

function SuccessCard() {
  // Pre-compute pixel positions so the burst is deterministic per mount
  const pixels = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 200,
        delay: i * 0.04,
        scale: 0.5 + Math.random() * 1.2,
      })),
    [],
  );

  return (
    <div className="relative border border-border rounded-3xl p-10 md:p-16 bg-card/40 backdrop-blur-md text-center overflow-hidden">
      <AuroraShader className="opacity-50" />

      {/* Pixel burst */}
      <div className="absolute left-1/2 top-[34%] -translate-x-1/2 pointer-events-none">
        {pixels.map((p, i) => (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: p.scale }}
            transition={{ duration: 1.6, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
            className="absolute block size-1.5 bg-accent"
            style={{ boxShadow: "0 0 12px var(--color-accent)" }}
          />
        ))}
      </div>

      <motion.span
        initial={{ scale: 0, rotate: -120 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-grid place-items-center size-20 rounded-full bg-accent/15 border border-accent/40 mx-auto mb-6"
      >
        <Check className="size-9 text-accent" />
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative font-display text-3xl md:text-4xl font-semibold tracking-tight"
      >
        <span className="text-silver">Message </span>
        <span className="text-electric">received.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative mt-4 text-foreground/75 max-w-md mx-auto leading-relaxed text-[15px] md:text-base"
      >
        Thanks for reaching out. A senior engineer from {COMPANY.name} will be in
        touch within one business day.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative mt-6 font-mono text-xs text-muted-foreground/70 uppercase tracking-[0.2em]"
      >
        Watch for a reply from{" "}
        <span className="text-accent">{COMPANY.email}</span>
      </motion.p>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border p-5 bg-card/30 hover:border-accent/30 transition-colors duration-300">
      <div className="flex items-center gap-2.5 mb-3">
        <Icon className="size-4 text-accent" />
        <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SocialPill({
  icon: Icon,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border text-sm transition-all duration-200";

  if (!href || href === "#") {
    return (
      <span
        aria-label={`${children} (coming soon)`}
        className={`${className} text-muted-foreground/50 cursor-default`}
      >
        <Icon className="size-4" />
        {children}
      </span>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor="grow"
      className={`${className} hover:border-accent/40 hover:bg-accent/10 hover:text-accent`}
    >
      <Icon className="size-4" />
      {children}
    </a>
  );
}

interface FloatFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const FloatField = forwardRef<HTMLInputElement, FloatFieldProps>(
  ({ id, label, error, type = "text", ...rest }, ref) => (
    <div className="field-float">
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder=" "
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
      {error && <p className="err">{error}</p>}
    </div>
  ),
);
FloatField.displayName = "FloatField";
