"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type AuditState = "idle" | "loading" | "results";

interface MetricBar {
  label: string;
  score: number;
}

interface AuditResults {
  globalScore: number;
  metrics: MetricBar[];
  weaknesses: string[];
  opportunities: string[];
}

// ─── Static audit data ────────────────────────────────────────────────────────

const AUDIT_RESULTS: AuditResults = {
  globalScore: 67,
  metrics: [
    { label: "SEO", score: 72 },
    { label: "Contenu", score: 58 },
    { label: "Performance", score: 81 },
    { label: "Conversion", score: 54 },
  ],
  weaknesses: [
    "Temps de chargement > 4s sur mobile",
    "Aucune balise meta description sur 8 pages",
    "Pas de pixel de conversion configuré",
  ],
  opportunities: [
    "Optimisation images → gain potentiel +23 points perf.",
    "Blog inexistant — fort potentiel SEO long-tail",
    "A/B test CTA → +15% conversion estimée",
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score > 70) return "#22c55e";  // green
  if (score >= 50) return "#f97316"; // orange
  return "#ef4444";                  // red
}

// ─── Circular progress ring ───────────────────────────────────────────────────

interface CircularScoreProps {
  score: number;
  animate: boolean;
}

function CircularScore({ score, animate }: CircularScoreProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto">
      <svg
        width="144"
        height="144"
        viewBox="0 0 144 144"
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#1E1E1E"
          strokeWidth="10"
        />
        {/* Progress */}
        <motion.circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#FF3B00"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={animate ? { strokeDashoffset: progress } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-[#F5F5F5]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[#555555]">/100</span>
      </div>
    </div>
  );
}

// ─── Metric bar ───────────────────────────────────────────────────────────────

interface MetricBarItemProps {
  label: string;
  score: number;
  delay: number;
  animate: boolean;
}

function MetricBarItem({ label, score, delay, animate }: MetricBarItemProps) {
  const color = scoreColor(score);
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-[#AAAAAA]">{label}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {score}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#1E1E1E] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonLoader() {
  const shimmer = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: "linear" as const,
    },
  };

  const shimmerStyle: React.CSSProperties = {
    background:
      "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
    backgroundSize: "200% 100%",
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Top row */}
      <div className="flex gap-4">
        <motion.div
          className="h-36 w-36 rounded-full flex-shrink-0"
          style={shimmerStyle}
          animate={shimmer.animate}
          transition={shimmer.transition}
        />
        <div className="flex-1 space-y-3 py-2">
          {[80, 65, 90, 55].map((w, i) => (
            <motion.div
              key={i}
              className="h-3 rounded-full"
              style={{ ...shimmerStyle, width: `${w}%` }}
              animate={shimmer.animate}
              transition={{ ...shimmer.transition, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      {/* Bottom rows */}
      {[100, 85, 92].map((w, i) => (
        <motion.div
          key={i}
          className="h-4 rounded-full"
          style={{ ...shimmerStyle, width: `${w}%` }}
          animate={shimmer.animate}
          transition={{ ...shimmer.transition, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ─── Results panel ────────────────────────────────────────────────────────────

interface ResultsPanelProps {
  results: AuditResults;
}

function ResultsPanel({ results }: ResultsPanelProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8"
    >
      {/* Global score + metric bars */}
      <motion.div
        variants={itemVariants}
        className="mb-6 rounded-xl border border-[#1E1E1E] bg-[#161616] p-6"
      >
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[#555555]">
          Score global
        </p>
        <CircularScore score={results.globalScore} animate />

        <div className="mt-6">
          {results.metrics.map((metric, i) => (
            <MetricBarItem
              key={metric.label}
              label={metric.label}
              score={metric.score}
              delay={0.3 + i * 0.12}
              animate
            />
          ))}
        </div>
      </motion.div>

      {/* Two columns: weaknesses + opportunities */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weaknesses */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-[#2a1a1a] bg-[#130e0e] p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#ef4444]">
            Points faibles
          </p>
          <ul className="space-y-2">
            {results.weaknesses.map((text, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2 text-sm text-[#CCCCCC]"
              >
                <span className="mt-0.5 flex-shrink-0 text-[#ef4444]" aria-label="Avertissement">
                  ⚠️
                </span>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Opportunities */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-[#0e2a15] bg-[#0a150c] p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            Opportunités
          </p>
          <ul className="space-y-2">
            {results.opportunities.map((text, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2 text-sm text-[#CCCCCC]"
              >
                <span className="mt-0.5 flex-shrink-0 text-[#22c55e]" aria-label="Opportunité">
                  ✓
                </span>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── AuditTool Component ──────────────────────────────────────────────────────

export default function AuditTool() {
  const [url, setUrl] = useState<string>("");
  const [auditState, setAuditState] = useState<AuditState>("idle");

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleAudit = () => {
    if (auditState === "loading" || auditState === "results") return;
    setAuditState("loading");
    setTimeout(() => {
      setAuditState("results");
    }, 2000);
  };

  const handleReset = () => {
    setAuditState("idle");
    setUrl("");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "#111111" }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-2xl"
      >
        {/* Header */}
        <div className="mb-4 text-center">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#F5F5F5] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Auditez votre site en 30 secondes
          </h2>
        </div>
        <p className="mb-10 text-center text-[#888888] text-lg">
          Découvrez gratuitement les points faibles de votre présence digitale.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAudit()}
            placeholder="https://votre-site.com"
            disabled={auditState === "loading" || auditState === "results"}
            className="flex-1 rounded-xl border border-[#222222] bg-[#0D0D0D] px-4 py-3 text-[#F5F5F5] placeholder-[#444444] outline-none transition-all duration-200 focus:border-[#FF3B00] focus:ring-1 focus:ring-[#FF3B00] disabled:opacity-50"
          />
          {auditState === "results" ? (
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl border border-[#333333] bg-transparent px-6 py-3 text-sm font-semibold text-[#888888] hover:text-[#F5F5F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              Recommencer
            </motion.button>
          ) : (
            <motion.button
              onClick={handleAudit}
              disabled={auditState === "loading"}
              whileHover={auditState !== "loading" ? { scale: 1.03 } : {}}
              whileTap={auditState !== "loading" ? { scale: 0.97 } : {}}
              className="rounded-xl bg-[#FF3B00] px-6 py-3 text-sm font-semibold text-white transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {auditState === "loading" ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Analyse en cours…
                </span>
              ) : (
                "Auditer mon site gratuitement"
              )}
            </motion.button>
          )}
        </div>

        {/* Dynamic content area */}
        <AnimatePresence mode="wait">
          {auditState === "loading" && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonLoader />
            </motion.div>
          )}

          {auditState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ResultsPanel results={AUDIT_RESULTS} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
