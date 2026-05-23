import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Code2, Lock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { Counter } from "@/components/Counter";
import { AuroraShader } from "@/components/AuroraShader";
import { SERVICES, COMPANY } from "@/lib/content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services | ${COMPANY.name}` },
      {
        name: "description",
        content:
          "Custom LLM fine-tuning, AI agents, conversational and voice bots, RAG systems, computer vision, web and mobile apps, MLOps, and AI strategy. Built by GrayBit Labs.",
      },
      { property: "og:title", content: `Services | ${COMPANY.name}` },
      {
        property: "og:description",
        content: "Nine capabilities for teams building real AI products.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pt-24 md:pt-36 pb-20 grid-pattern overflow-hidden">
        <AuroraShader className="opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-5">
              Capabilities
            </p>
          </SectionReveal>
          <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight max-w-4xl leading-[1.05]">
            <SplitText
              text="Nine ways we help you"
              split="word"
              stagger={0.06}
              className="block text-silver"
            />
            <SplitText
              text="ship AI that actually works."
              split="word"
              stagger={0.05}
              delay={0.3}
              className="block text-electric"
            />
          </h1>
          <SectionReveal delay={500}>
            <p className="mt-7 max-w-2xl text-foreground/70 text-base md:text-lg leading-relaxed">
              Every engagement targets a real production outcome, not a proof of
              concept that gathers dust. Tell us your problem and we'll find the
              fastest path to value.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── SERVICE CARDS ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <SectionReveal key={s.title} delay={i * 60} direction="up">
                <TiltCard className="group h-full">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    data-cursor="grow"
                    className="block h-full"
                  >
                    <article className="h-full p-7 md:p-9 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-accent/30 transition-all duration-300 flex flex-col">
                      <div className="mb-7">
                        <span className="inline-flex items-center justify-center size-12 rounded-xl border border-border bg-secondary/50 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                          <Icon className="size-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                        {s.title}
                      </h2>

                      <p className="text-foreground/70 leading-relaxed mb-7 text-[15px]">
                        {s.body}
                      </p>

                      <ul className="grid grid-cols-2 gap-1.5 mb-6">
                        {s.items.map((item) => (
                          <li
                            key={item}
                            className="px-2.5 py-1.5 border border-border rounded-lg text-muted-foreground text-[10.5px] font-mono uppercase tracking-wider bg-secondary/20 group-hover:border-accent/20 transition-colors duration-300"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-mono text-accent opacity-70 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300">
                        Read the full breakdown <ArrowRight className="size-3.5" />
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="mb-12 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              Why GrayBit
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-silver">Three things you won't </span>
              <span className="text-electric">get anywhere else.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Built for production",
                stat: 100,
                statSuffix: "%",
                statLabel: "of projects live in production",
                body: "Every system we deliver runs in production, monitored, with CI/CD and an eval harness. We don't hand you a notebook.",
              },
              {
                icon: Code2,
                title: "Senior engineers only",
                stat: 8,
                statSuffix: "+ yrs",
                statLabel: "average engineering experience",
                body: "Your project is led by senior engineers with hands-on ML experience. Nobody hands off the real work to juniors.",
              },
              {
                icon: Lock,
                title: "Your data, your IP",
                stat: 0,
                statSuffix: "",
                statLabel: "data leaves your infrastructure",
                body: "We deploy on your infrastructure. Your data never touches our servers. You own all code, weights, and artifacts.",
              },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 80} direction="up">
                <TiltCard className="group h-full" max={4}>
                  <div className="h-full p-8 rounded-2xl border border-border bg-card/40 hover:bg-card/80 hover:border-accent/30 transition-all duration-300">
                    <item.icon className="size-7 text-accent mb-5 group-hover:scale-110 transition-transform duration-300" />
                    <Counter
                      to={item.stat}
                      suffix={item.statSuffix}
                      className="font-display text-3xl md:text-4xl text-electric block mb-1"
                    />
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-5">
                      {item.statLabel}
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-foreground/70 text-[14.5px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="relative p-10 md:p-16 border border-border rounded-3xl bg-card/40 overflow-hidden flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <AuroraShader className="opacity-40" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight max-w-xl leading-[1.1]">
                  <span className="text-silver">Not sure which service </span>
                  <span className="text-electric">fits your problem?</span>
                </h3>
                <p className="mt-4 text-foreground/70 max-w-md leading-relaxed text-[15px] md:text-base">
                  Describe what you're trying to build and we'll propose the
                  right approach. No obligation.
                </p>
              </div>
              <Magnetic>
                <Link
                  to="/contact"
                  data-cursor="grow"
                  className="btn-accent relative z-10 inline-flex items-center gap-2 px-7 py-4 text-sm shrink-0"
                >
                  Start a project <ArrowUpRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </SectionReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
