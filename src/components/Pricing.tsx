"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "990",
    popular: false,
    features: [
      "1 agent actif",
      "Contenu + SEO de base",
      "Rapport mensuel",
      "Support email",
      "5 posts/semaine",
    ],
    cta: "Commencer",
    ctaVariant: "outline" as const,
    borderClass: "border border-[#222222]",
    scale: false,
  },
  {
    name: "Growth",
    price: "1 990",
    popular: true,
    features: [
      "3 agents actifs",
      "Contenu + SEO + Pub",
      "Rapports hebdomadaires",
      "Support prioritaire 7j/7",
      "15 posts/semaine",
      "A/B testing inclus",
      "Dashboard analytics",
    ],
    cta: "Commencer — le plus populaire",
    ctaVariant: "filled" as const,
    borderClass: "border-2 border-[#FF3B00]",
    scale: true,
  },
  {
    name: "Scale",
    price: "3 490",
    popular: false,
    features: [
      "Agents illimités",
      "Suite complète IA",
      "Rapports en temps réel",
      "Account manager dédié",
      "Posts illimités",
      "Stratégie personnalisée",
      "API + intégrations",
      "SLA 99.9%",
    ],
    cta: "Contacter l'équipe",
    ctaVariant: "outline" as const,
    borderClass: "border border-[#222222]",
    scale: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

interface PricingCardProps {
  plan: (typeof plans)[number];
}

function PricingCard({ plan }: PricingCardProps) {
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={cardVariants}
      className={`relative flex flex-col rounded-2xl p-8 ${plan.borderClass} ${
        plan.scale ? "scale-105 shadow-2xl" : ""
      }`}
      style={{
        backgroundColor: "#111111",
        boxShadow: isPopular
          ? "0 0 40px 0 rgba(255,59,0,0.15)"
          : "0 4px 24px 0 rgba(0,0,0,0.3)",
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: "#FF3B00" }}
          >
            Le plus populaire
          </span>
        </div>
      )}

      {/* Plan name */}
      <div className="mb-4">
        <h3
          className="text-lg font-semibold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: isPopular ? "#FF3B00" : "#888888",
          }}
        >
          {plan.name}
        </h3>
      </div>

      {/* Price */}
      <div className="flex items-end gap-1 mb-8">
        <span
          className="text-5xl font-bold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#F5F5F5",
          }}
        >
          {plan.price}€
        </span>
        <span
          className="text-sm mb-1.5"
          style={{ color: "#888888" }}
        >
          /mois
        </span>
      </div>

      {/* Feature list */}
      <ul className="flex-1 flex flex-col gap-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className="flex-shrink-0 text-base font-bold leading-none"
              style={{ color: "#FF3B00" }}
            >
              ✓
            </span>
            <span className="text-sm" style={{ color: "#C0C0C0" }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      {plan.ctaVariant === "filled" ? (
        <button
          className="w-full rounded-xl py-3.5 px-6 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{
            backgroundColor: "#FF3B00",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {plan.cta}
        </button>
      ) : (
        <button
          className="w-full rounded-xl py-3.5 px-6 text-sm font-semibold transition-all duration-200 hover:border-[#FF3B00] hover:text-[#FF3B00] active:scale-[0.98]"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #333333",
            color: "#F5F5F5",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {plan.cta}
        </button>
      )}
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F5F5F5",
            }}
          >
            Des tarifs pensés pour la croissance
          </h2>
          <p
            className="text-lg"
            style={{ color: "#888888" }}
          >
            Aucun contrat. Aucune surprise. Juste des résultats.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        {/* Billing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center text-sm mt-10"
          style={{ color: "#555555" }}
        >
          Tous les prix sont HT. Résiliable à tout moment.
        </motion.p>
      </div>
    </section>
  );
}
