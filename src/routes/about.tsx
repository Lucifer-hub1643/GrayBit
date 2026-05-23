import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { SiteLayout } from "@/components/SiteLayout";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { Counter } from "@/components/Counter";
import { AuroraShader } from "@/components/AuroraShader";
import { STATS, PRINCIPLES, COMPANY } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About | ${COMPANY.name}` },
      {
        name: "description",
        content:
          "GrayBit Labs is a focused AI engineering studio building production-ready AI for serious businesses worldwide.",
      },
      { property: "og:title", content: `About | ${COMPANY.name}` },
      {
        property: "og:description",
        content: "Senior AI engineers building systems that ship, not demos.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pt-24 md:pt-36 pb-24 md:pb-32 grid-pattern overflow-hidden">
        <AuroraShader className="opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-5">
              About
            </p>
          </SectionReveal>
          <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight max-w-5xl leading-[1.05]">
            <SplitText
              text="We build AI the way"
              split="word"
              stagger={0.06}
              className="block text-silver"
            />
            <SplitText
              text="great things are built."
              split="word"
              stagger={0.05}
              delay={0.3}
              className="block text-silver"
            />
            <SplitText
              text="Carefully and completely."
              split="word"
              stagger={0.06}
              delay={0.7}
              className="block text-electric"
            />
          </h1>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <SectionReveal className="md:col-span-5" direction="left">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Mission
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug">
              <span className="text-silver">Making production AI accessible to every </span>
              <span className="text-electric">ambitious business.</span>
            </h2>
          </SectionReveal>

          <SectionReveal
            className="md:col-span-7 space-y-5 text-foreground/75 leading-relaxed text-base md:text-lg"
            direction="right"
            delay={100}
          >
            <p>
              GrayBit Labs was founded because too many AI projects die between
              a demo and production. The gap between "this works in a notebook"
              and "this runs reliably at scale" is where most consultancies fall
              short. It's exactly where we live.
            </p>
            <p>
              We're a small team of ML engineers and full-stack developers who
              have shipped AI systems across e-commerce, legal, healthcare,
              logistics, and finance. We don't manage projects from a distance.
              We build.
            </p>
            <p>
              We go deep on the technical side. We don't resell APIs or bolt a
              chatbot onto your product and call it AI. We fine-tune models on
              your data, architect retrieval systems from the ground up, write
              voice and chat agents that hand off gracefully, and ship the
              infrastructure that keeps everything running reliably.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-24 md:py-32 border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <SectionReveal key={s.v} delay={i * 80} direction="up">
                <TiltCard className="group h-full" max={4}>
                  <div className="p-8 md:p-10 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300 h-full">
                    <Counter
                      to={s.n}
                      suffix={s.suffix}
                      className="font-display text-4xl md:text-5xl font-medium text-electric"
                    />
                    <div className="mt-3 text-[11px] md:text-xs text-foreground/60 uppercase tracking-[0.18em] max-w-[14ch] font-mono">
                      {s.v}
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES (with scroll-linked vertical timeline) ─────────── */}
      <PrinciplesSection />

      {/* ── WHAT MAKES US DIFFERENT ───────────────────────────────────── */}
      <section className="px-5 md:px-8 py-24 md:py-32 border-t border-border bg-card/20">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="max-w-3xl mx-auto text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Our approach
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">We think differently </span>
              <span className="text-electric">about AI work.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "We measure output, not effort",
                body: "Fixed-scope engagements with clear deliverables. You know what you're getting before we start. No hourly billing surprises.",
              },
              {
                label: "We work in the open",
                body: "You have access to our repo, staging environment, and weekly demos from day one. Nothing is hidden until a big reveal.",
              },
              {
                label: "We stay after launch",
                body: "AI systems degrade without care. We offer retainer-based maintenance and retraining so your system improves over time.",
              },
            ].map((item, i) => (
              <SectionReveal key={item.label} delay={i * 100}>
                <TiltCard className="h-full" max={3}>
                  <div className="p-8 md:p-10 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300 h-full">
                    <h3 className="text-lg md:text-xl font-semibold mb-3">{item.label}</h3>
                    <p className="text-foreground/70 text-[14.5px] leading-relaxed">{item.body}</p>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="relative p-10 md:p-16 border border-border rounded-3xl bg-card/40 overflow-hidden flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <AuroraShader className="opacity-40" />
              <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight max-w-xl leading-[1.1] relative z-10">
                <span className="text-silver">Want to see if we're </span>
                <span className="text-electric">the right fit?</span>
              </h3>
              <Magnetic>
                <Link
                  to="/contact"
                  data-cursor="grow"
                  className="btn-accent relative z-10 inline-flex items-center gap-2 px-7 py-4 text-sm shrink-0"
                >
                  Talk to the team <ArrowUpRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </SectionReveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function PrinciplesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 35%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="px-5 md:px-8 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-14 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            Principles
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-silver">Four things we </span>
            <span className="text-electric">won't compromise on.</span>
          </h2>
        </SectionReveal>

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vertical progress rail (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-border -translate-x-1/2">
            <motion.span
              style={{ height: progressHeight }}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent to-accent-glow w-px shadow-[0_0_12px_2px_rgba(61,126,255,0.4)]"
            />
          </div>

          {PRINCIPLES.map((p, i) => (
            <SectionReveal key={p.n} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
              <TiltCard className="group h-full" max={4}>
                <div className="p-8 md:p-10 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300 h-full">
                  <span className="font-mono text-xs text-accent">{p.n}</span>
                  <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-200">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-foreground/70 leading-relaxed max-w-md text-[15px]">
                    {p.b}
                  </p>
                </div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
