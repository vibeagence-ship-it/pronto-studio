// Page principale — Pronto Studio
import Hero from "@/components/Hero";
import AuditTool from "@/components/AuditTool";
import AgentFeed from "@/components/AgentFeed";
import Pricing from "@/components/Pricing";
import Results from "@/components/Results";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Navigation sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-[#080808]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-[family-name:var(--font-space-grotesk)] font-bold text-xl tracking-tight">
            ⚡ PRONTO<span className="text-[#FF3B00]">STUDIO</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#888888]">
            <a href="#audit" className="hover:text-[#F5F5F5] transition-colors">Audit gratuit</a>
            <a href="#agents" className="hover:text-[#F5F5F5] transition-colors">Agents</a>
            <a href="#pricing" className="hover:text-[#F5F5F5] transition-colors">Tarifs</a>
            <a href="#resultats" className="hover:text-[#F5F5F5] transition-colors">Résultats</a>
          </div>
          <a
            href="#pricing"
            className="bg-[#FF3B00] hover:bg-[#FF5A2A] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Démarrer
          </a>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <AuditTool />
      <AgentFeed />
      <Pricing />
      <Results />
      <Footer />
    </main>
  );
}
