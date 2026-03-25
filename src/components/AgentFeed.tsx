"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const feedItems = [
  {
    agent: "Agent Contenu",
    action: "3 posts LinkedIn publiés",
    client: "@boutique_mode_paris",
    time: "2min",
    color: "#4ADE80",
  },
  {
    agent: "Agent Veille",
    action: "47 articles scannés, rapport envoyé",
    client: "@startup_saas",
    time: "5min",
    color: "#60A5FA",
  },
  {
    agent: "Agent SEO",
    action: "12 mots-clés optimisés",
    client: "@restaurant_lyon",
    time: "8min",
    color: "#FACC15",
  },
  {
    agent: "Agent Pub",
    action: "ROAS 4.2x atteint",
    client: "@ecommerce_sport",
    time: "11min",
    color: "#F472B6",
  },
  {
    agent: "Agent Email",
    action: "Campagne envoyée à 2 340 contacts",
    client: "@formation_pro",
    time: "14min",
    color: "#A78BFA",
  },
  {
    agent: "Agent Contenu",
    action: "5 fiches produits rédigées",
    client: "@maison_deco_lyon",
    time: "18min",
    color: "#4ADE80",
  },
  {
    agent: "Agent Analytics",
    action: "Rapport hebdomadaire généré",
    client: "@agence_voyage_paris",
    time: "22min",
    color: "#34D399",
  },
  {
    agent: "Agent Pub",
    action: "Budget optimisé −12% CPC",
    client: "@tech_startup_nantes",
    time: "27min",
    color: "#F472B6",
  },
  {
    agent: "Agent SEO",
    action: "Backlink DA78 obtenu",
    client: "@cabinet_conseil",
    time: "31min",
    color: "#FACC15",
  },
  {
    agent: "Agent Veille",
    action: "Alerte concurrents : 3 nouvelles offres",
    client: "@ecommerce_mode",
    time: "35min",
    color: "#60A5FA",
  },
];

// Duplicate for seamless infinite loop
const duplicatedFeed = [...feedItems, ...feedItems];

interface FeedItemCardProps {
  item: (typeof feedItems)[number];
  index: number;
}

function FeedItemCard({ item, index }: FeedItemCardProps) {
  return (
    <motion.div
      key={index}
      className="feed-card flex items-center gap-4 rounded-xl px-5 py-4 cursor-default"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #222222",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 16px 2px ${item.color}33`,
        borderColor: item.color + "66",
      }}
    >
      {/* Colored dot */}
      <div
        className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}
      />

      {/* Agent + action */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-semibold text-sm"
            style={{ color: item.color }}
          >
            {item.agent}
          </span>
          <span className="text-sm" style={{ color: "#F5F5F5" }}>
            — {item.action}
          </span>
        </div>
        <div className="text-sm mt-0.5" style={{ color: "#888888" }}>
          {item.client}
        </div>
      </div>

      {/* Time */}
      <div className="flex-shrink-0 text-sm text-right" style={{ color: "#444444" }}>
        il y a {item.time}
      </div>
    </motion.div>
  );
}

export default function AgentFeed() {
  const [actionCount, setActionCount] = useState(2847);
  const [isPaused, setIsPaused] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Increment counter every 3 seconds by a random 1–3
  useEffect(() => {
    const interval = setInterval(() => {
      setActionCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="agents"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Subtle grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              color: "#888888",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }}
            />
            <span>
              <span className="font-bold" style={{ color: "#F5F5F5" }}>
                {actionCount.toLocaleString("fr-FR")}
              </span>{" "}
              actions réalisées aujourd'hui
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {/* Green live dot */}
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "#4ADE80" }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ backgroundColor: "#4ADE80" }}
            />
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-center"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F5F5F5",
            }}
          >
            Nos agents travaillent en ce moment
          </h2>
        </motion.div>

        {/* Scrolling feed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative overflow-hidden"
          style={{ height: "420px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top fade */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 z-10"
            style={{
              height: "60px",
              background: "linear-gradient(to bottom, #080808, transparent)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
            style={{
              height: "60px",
              background: "linear-gradient(to top, #080808, transparent)",
            }}
          />

          {/* Scrolling container */}
          <div
            ref={feedRef}
            className="flex flex-col gap-3"
            style={{
              animation: `scrollFeed 35s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedFeed.map((item, index) => (
              <FeedItemCard key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Keyframe injection */}
      <style jsx global>{`
        @keyframes scrollFeed {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
}
