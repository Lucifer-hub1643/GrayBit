import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Shield } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionReveal } from "@/components/SectionReveal";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { AuroraShader } from "@/components/AuroraShader";
import { HorizontalCaseStudies } from "@/components/HorizontalCaseStudies";
import { CASE_STUDIES, COMPANY } from "@/lib/content";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: `Work | ${COMPANY.name}` },
      {
        name: "description",
        content:
          "Selected work from GrayBit Labs. Marketplaces, computer vision platforms, and AI-powered sales systems built for production.",
      },
      { property: "og:title", content: `Work | ${COMPANY.name}` },
      {
        property: "og:description",
        content:
          "SkyBridge, VisionAtlas, and LeadIntel. Production platforms for drone services, computer vision, and sales automation.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteLayout>
      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative px-5 md:px-8 pt-24 md:pt-36 pb-16 md:pb-20 grid-pattern overflow-hidden">
        <AuroraShader className="opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-5">
              Selected work
            </p>
          </SectionReveal>
          <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight max-w-4xl leading-[1.05]">
            <SplitText
              text="Real systems."
              split="word"
              stagger={0.07}
              className="block text-silver"
            />
            <SplitText
              text="Real results."
              split="word"
              stagger={0.07}
              delay={0.25}
              className="block text-electric"
            />
          </h1>
          <SectionReveal delay={500}>
            <p className="mt-7 max-w-2xl text-foreground/70 text-base md:text-lg leading-relaxed">
              Platforms we have designed and built end to end: marketplaces,
              computer vision systems, and AI-powered sales infrastructure.
              Each project below shows what the product does, what we shipped,
              and the capabilities behind it.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── HORIZONTAL CASE STUDY SCROLLER ───────────────────────────── */}
      <section className="md:bg-card/20 md:border-y md:border-border">
        <div className="px-5 md:px-0 py-16 md:py-0">
          <HorizontalCaseStudies studies={CASE_STUDIES} />
        </div>
      </section>

      {/* ── NDA NOTICE ────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="border border-border/60 rounded-3xl p-8 md:p-12 bg-card/30 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 backdrop-blur-sm">
              <Shield className="size-9 text-accent shrink-0" />
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                  Confidential work
                </p>
                <p className="text-foreground/75 leading-relaxed text-[15px] md:text-base">
                  Many of our most impactful projects are under NDA. If you'd like to see work
                  specific to your industry or use case, reach out and we'll share what we can
                  under a quick mutual NDA.
                </p>
              </div>
              <Magnetic>
                <Link
                  to="/contact"
                  data-cursor="grow"
                  className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium shrink-0"
                >
                  Request a walkthrough
                  <ArrowUpRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="relative p-10 md:p-16 border border-border rounded-3xl bg-card/40 overflow-hidden flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <AuroraShader className="opacity-40" />
              <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight max-w-xl leading-[1.1] relative z-10">
                <span className="text-silver">Ready to be our </span>
                <span className="text-electric">next case study?</span>
              </h3>
              <Magnetic>
                <Link
                  to="/contact"
                  data-cursor="grow"
                  className="btn-accent relative z-10 inline-flex items-center gap-2 px-7 py-4 text-sm shrink-0"
                >
                  Let's build it <ArrowUpRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </SectionReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
