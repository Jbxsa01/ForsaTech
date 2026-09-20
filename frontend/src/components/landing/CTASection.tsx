import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#FDFBF8]">
      {/* Background image & overlay */}
      <div
        className="absolute inset-0 opacity-15 blur-[2px] bg-cover bg-center"
        style={{ backgroundImage: "url('/5340018.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF8] via-[#FFF6EB]/85 to-white" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-[#FF7A00]/20 text-[#FF7A00] text-sm font-semibold shadow-sm">
              <MessageSquare className="w-4 h-4" />
              Forsa Copilot
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1F1B16] leading-tight">
              Prêt à transformer votre carrière ?
            </h2>
            <p className="text-lg md:text-xl text-[#3D332A]/82 leading-relaxed max-w-2xl">
              Un copilote IA mature pour piloter vos candidatures, structurer vos entretiens et livrer des réponses
              précises en continu, sans ton marketing excessif.
            </p>

            <ul className="space-y-3 text-[#3D332A]/85">
              {[
                "Recommandations ciblées et classées par priorité",
                "Guides d’entretien contextualisés par entreprise",
                "Justifications claires des matchs et des écarts",
                "Coaching continu : CV, pitch et suivi des relances",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF7A00] mt-0.5" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-[#FF7A00] hover:bg-[#E56700] text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#FF7A00]/25 text-[#1F1B16] hover:bg-[#FF7A00]/10 font-semibold px-8 py-3 rounded-xl"
                >
                  J'ai déjà un compte
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#3D332A]/75">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>Pas de carte bancaire requise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>Configuration en 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>100% gratuit</span>
              </div>
            </div>
          </div>

          {/* Mock chat side */}
          <div className="relative">
            <div className="absolute -top-6 -left-4 w-20 h-20 bg-[#FF7A00]/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-6 w-28 h-28 bg-[#FF7A00]/20 rounded-full blur-3xl" />

              <div className="relative bg-white/92 backdrop-blur-xl border border-[#E7DED2] rounded-2xl shadow-[0_18px_60px_rgba(31,27,22,0.12)] p-6 md:p-8">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E9E1D7]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#FF7A00]/30 shadow-sm flex items-center justify-center overflow-hidden">
                      <img
                        src="/logo.png"
                        alt="ForsaTech"
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B5B4A]">Forsa Copilot</p>
                      <p className="text-base font-semibold text-[#1F1B16]">Votre copilote IA carrière</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B5B4A]">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    Session sécurisée · 24/7
                  </div>
                </div>
              <div className="space-y-4 text-sm">
                <div className="max-w-[80%] rounded-2xl bg-[#F7F1E9] text-[#1F1B16] px-4 py-3 shadow-sm">
                  Bonjour ! Priorisons vos candidatures et préparons vos prochains entretiens.
                </div>
                <div className="max-w-[80%] ml-auto rounded-2xl bg-[#FF7A00] text-white px-4 py-3 shadow-md">
                  Je cherche des postes Data Analyst (Casablanca) avec &gt;3 ans d'expérience.
                </div>
                <div className="max-w-[80%] rounded-2xl bg-white border border-[#FF7A00]/15 px-4 py-3 shadow-sm">
                  ✓ 18 offres pertinentes, triées par priorité<br />
                  ✓ Score de matching moyen : 92%<br />
                  ✓ Ajustements ATS appliqués sur votre CV
                </div>
                <div className="max-w-[80%] ml-auto rounded-2xl bg-[#FF7A00]/10 text-[#1F1B16] px-4 py-3 border border-[#FF7A00]/20">
                  Prépare 3 points forts pour l’entretien Tech+Produit.
                </div>
                <div className="max-w-[80%] rounded-2xl bg-white border border-[#FF7A00]/15 px-4 py-3 shadow-sm">
                  Bien sûr, basés sur votre parcours :
                  <br />• SQL/PowerBI : mise en prod de dashboards KPI métier
                  <br />• Projets finance & retail : compréhension business forte
                  <br />• Capacité à transformer les besoins en KPIs actionnables
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9E1D7] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span className="text-xs text-[#6B5B4A]">Disponible 24/7 — réponses en quelques secondes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
