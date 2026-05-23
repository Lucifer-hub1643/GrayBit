import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Animate per "word" or per "char". Default: word */
  split?: "word" | "char";
  /** Stagger between units in seconds. */
  stagger?: number;
  /** Delay before the first unit animates. */
  delay?: number;
  /** Wait until in view (defaults true). */
  inView?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const unitVariants = {
  hidden: { y: "110%", opacity: 0, rotate: 2 },
  show: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Cinematic text reveal: each word/char rises from below with stagger.
 * Wraps each unit in an overflow-hidden mask for the "curtain" effect.
 */
export function SplitText({
  text,
  className = "",
  split = "word",
  stagger = 0.06,
  delay = 0,
  inView = true,
  as = "span",
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.span;

  const units =
    split === "word"
      ? text.split(/(\s+)/).filter((s) => s.length > 0)
      : Array.from(text);

  if (reduced) {
    return <Comp className={className}>{text}</Comp>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView={inView ? "show" : undefined}
      animate={!inView ? "show" : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {units.map((unit, i) => {
        if (/^\s+$/.test(unit)) {
          return <span key={i}> </span>;
        }
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden align-bottom leading-[1.05] pb-[0.08em]"
          >
            <motion.span variants={unitVariants} className="inline-block">
              {unit}
            </motion.span>
          </span>
        );
      })}
    </Comp>
  );
}
