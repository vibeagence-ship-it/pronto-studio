"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Secteur = "E-commerce" | "SaaS" | "B2B" | "Artisan" | "Restaurant";
type Objectif = "Notoriété" | "Leads" | "Ventes";

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTEURS: Secteur[] = ["E-commerce", "SaaS", "B2B", "Artisan", "Restaurant"];
const OBJECTIFS: Objectif[] = ["Notoriété", "Leads", "Ventes"];

const BASE_PRICE: Record<Secteur, number> = {
  "E-commerce": 990,
  SaaS: 1490,
  B2B: 1290,
  Artisan: 790,
  Restaurant: 890,
};

const OBJECTIVE_MULTIPLIER: Record<Objectif, number> = {
  Notoriété: 1.0,
  Leads: 1.2,
  Ventes: 1.35,
};

// ─── Price calculation ────────────────────────────────────────────────────────

function calculatePrice(secteur: Secteur, budget: number, objectif: Objectif): number {
  const base = BASE_PRICE[secteur];
  const budgetMultiplier = (budget / 1000) * 0.3 + 0.85;
  const objectiveMultiplier = OBJECTIVE_MULTIPLIER[objectif];
  return Math.round((base * budgetMultiplier * objectiveMultiplier) / 10) * 10;
}

// ─── Pill Button ─────────────────────────────────────────────────────────────

interface PillButtonProps<T extends string> {
  value: T;
  selected: T;
  onSelect: (value: T) => void;
}

function PillButton<T extends string>({ value, selected, onSelect }: PillButtonProps<T>) {
  const isSelected = value === selected;
  return (
    <motion.button
      onClick={() => onSelect(value)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-200 cursor-pointer ${
        isSelected
          ? "bg-[#FF3B00] border-[#FF3B00] text-white"
          : "bg-transparent border-[#333333] text-[#888888] hover:border-[#555555] hover:text-[#BBBBBB]"
      }`}
    >
      {value}
    </motion.button>
  );
}

// ─── Magnetic CTA Button ──────────────────────────────────────────────────────

function MagneticCTAButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const translateX = useTransform(x, [-50, 50], [-8, 8]);
  const translateY = useTransform(y, [-20, 20], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: translateX, y: translateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: "0 0 40px 8px rgba(255, 59, 0, 0.45)",
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-[#FF3B00] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full cursor-pointer transition-shadow duration-200 text-sm sm:text-base"
    >
      Démarrer maintenant
    </motion.button>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="text-[#555555] text-xs tracking-widest uppercase">Scroll</span>
      <motion.div
        className="w-[1px] h-8 bg-gradient-to-b from-[#555555] to-transparent"
        animate={{ scaleY: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const [secteur, setSecteur] = useState<Secteur>("SaaS");
  const [budget, setBudget] = useState<number>(2000);
  const [objectif, setObjectif] = useState<Objectif>("Leads");

  const price = calculatePrice(secteur, budget, objectif);
  const priceKey = `${secteur}-${budget}-${objectif}`;

  // Headline animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay },
    }),
  };

  return (
    <section
      className="grid-bg relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Radial glow behind headline */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 35%, rgba(255,59,0,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl w-full text-center">
        {/* Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <motion.h1
            variants={lineVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#F5F5F5] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            L&apos;âge des agents IA est là.
          </motion.h1>
          <motion.h1
            variants={lineVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#F5F5F5] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Votre marketing travaille
            <br className="hidden md:block" /> pendant que vous dormez.
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          custom={0.85}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-[#888888] text-lg mb-12 max-w-xl mx-auto"
        >
          Automatisez votre marketing avec des agents IA spécialisés.
          <br />
          Plus de leads, moins d&apos;effort.
        </motion.p>

        {/* ── Interactive Estimator ── */}
        <motion.div
          custom={1.1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-10 max-w-2xl rounded-2xl border border-[#1E1E1E] bg-[#0D0D0D] p-6 text-left"
        >
          {/* Secteur */}
          <div className="mb-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#555555]">
              Secteur
            </label>
            <div className="flex flex-wrap gap-2">
              {SECTEURS.map((s) => (
                <PillButton<Secteur>
                  key={s}
                  value={s}
                  selected={secteur}
                  onSelect={setSecteur}
                />
              ))}
            </div>
          </div>

          {/* Budget mensuel */}
          <div className="mb-5">
            <label className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-[#555555]">
              <span>Budget mensuel</span>
              <span className="text-[#F5F5F5] text-sm normal-case tracking-normal">
                {budget.toLocaleString("fr-FR")}€
              </span>
            </label>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#FF3B00]"
              style={{ accentColor: "#FF3B00" }}
            />
            <div className="mt-1 flex justify-between text-[10px] text-[#444444]">
              <span>500€</span>
              <span>5 000€</span>
            </div>
          </div>

          {/* Objectif */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#555555]">
              Objectif
            </label>
            <div className="flex flex-wrap gap-2">
              {OBJECTIFS.map((o) => (
                <PillButton<Objectif>
                  key={o}
                  value={o}
                  selected={objectif}
                  onSelect={setObjectif}
                />
              ))}
            </div>
          </div>

          {/* Price estimate */}
          <div className="rounded-xl bg-[#111111] border border-[#1E1E1E] px-5 py-4 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#555555]">
              Votre estimation personnalisée
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={priceKey}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="text-4xl font-bold"
                style={{
                  color: "#FF3B00",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {price.toLocaleString("fr-FR")}€
                <span className="text-lg font-medium text-[#888888]">/mois</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={1.4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <MagneticCTAButton />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
