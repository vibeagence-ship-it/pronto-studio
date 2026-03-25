"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Metric {
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  stars: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const metrics: Metric[] = [
  {
    prefix: "+",
    target: 340,
    decimals: 0,
    suffix: "%",
    label: "leads générés en moyenne",
  },
  {
    target: 4.8,
    decimals: 1,
    suffix: "x",
    label: "ROAS moyen sur les campagnes pub",
  },
  {
    target: 23,
    decimals: 0,
    suffix: "h",
    label: "économisées par semaine",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sophie Marchand",
    role: "Fondatrice, BoutiqueMode.fr",
    avatar: "SM",
    text: "En 6 semaines, nos ventes en ligne ont explosé. L'agent Pub a trouvé des audiences qu'on n'aurait jamais ciblées manuellement. ROAS à 5.3x le mois dernier.",
    stars: 5,
  },
  {
    name: "Karim Benali",
    role: "CEO, SaaSFlow",
    avatar: "KB",
    text: "On économise 3 jours de travail par semaine. L'agent Contenu génère des articles SEO qui rankent vraiment. +180% de trafic organique en 3 mois.",
    stars: 5,
  },
  {
    name: "Marie-Claire Dupont",
    role: "Directrice Marketing, GroupeABC",
    avatar: "MD",
    text: "Le reporting en temps réel change tout. Je vois exactement ce que chaque agent fait, avec les métriques. C'est transparent et ultra-efficace.",
    stars: 5,
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ---------------------------------------------------------------------------
// AnimatedCounter
// ---------------------------------------------------------------------------

interface AnimatedCounterProps {
  metric: Metric;
  trigger: boolean;
}

function AnimatedCounter({ metric, trigger }: AnimatedCounterProps) {
  const { prefix = "", target, decimals = 0, suffix } = metric;
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION = 1800; // ms

  useEffect(() => {
    if (!trigger) return;

    // Cancel any in-progress animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target.toFixed(decimals));
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [trigger, target, decimals]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MetricCard
// ---------------------------------------------------------------------------

interface MetricCardProps {
  metric: Metric;
  triggerAll: boolean;
}

function MetricCard({ metric, triggerAll }: MetricCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center gap-3 text-center"
    >
      <div className="text-6xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#FF3B00] tabular-nums leading-none">
        <AnimatedCounter metric={metric} trigger={triggerAll} />
      </div>
      <p className="text-[#888888] text-sm md:text-base leading-snug max-w-[180px]">
        {metric.label}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TestimonialCard
// ---------------------------------------------------------------------------

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#1A1A1A] border border-[#222222] rounded-2xl p-6 flex flex-col gap-4"
    >
      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${testimonial.stars} étoiles`}>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-base leading-none">
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-[#D0D0D0] text-sm md:text-base leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-[family-name:var(--font-space-grotesk)] shrink-0"
          style={{
            background: "linear-gradient(135deg, #FF3B00 0%, #FF7A50 100%)",
          }}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>

        <div className="flex flex-col">
          <span className="text-[#F5F5F5] text-sm font-semibold leading-tight">
            {testimonial.name}
          </span>
          <span className="text-[#888888] text-xs leading-tight mt-0.5">
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Results — main export
// ---------------------------------------------------------------------------

export default function Results() {
  // Refs and inView for metrics trigger
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-80px",
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="resultats"
      className="py-16 md:py-24 w-full"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="font-bold font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl text-[#F5F5F5] leading-tight tracking-tight">
            Des résultats qui parlent d&apos;eux-mêmes
          </h2>
          <p className="text-[#888888] text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Nos clients voient des résultats mesurables dès le premier mois.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          ref={metricsRef}
          variants={containerVariants}
          initial="hidden"
          animate={metricsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6"
        >
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              triggerAll={metricsInView}
            />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-[#222222]" aria-hidden="true" />

        {/* Testimonials */}
        <motion.div
          ref={testimonialsRef}
          variants={containerVariants}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
