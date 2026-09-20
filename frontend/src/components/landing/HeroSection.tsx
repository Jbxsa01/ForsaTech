import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, Briefcase, CheckCircle2, Play } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const HeroSection = () => {
  return (
    <section className="relative flex items-center overflow-hidden bg-white pt-14">


      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF7A00]/15 text-[#FF7A00] text-sm font-semibold mb-4 shadow-sm hover:shadow-md transition-shadow">
              <Sparkles className="w-4 h-4" />
              <span>Rejoignez +50,000 candidats qui ont trouvé leur emploi</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] mb-4 leading-[1.1]">
              Trouvez l'emploi de{" "}
              <span className="text-[#FF7A00]">vos rêves</span>
              <br />
              en quelques clics grâce à l'
              <span className="text-[#FF7A00]">IA</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#333333]/70 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Notre IA analyse votre profil, optimise votre CV et vous connecte avec les meilleures opportunités.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Link to="/signup">
                <Button 
                  size="xl" 
                  className="bg-[#FF7A00] hover:bg-[#E56700] text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  Créer mon profil gratuit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-2 border-[#FF7A00]/30 text-[#333333] hover:bg-[#FF7A00]/8 font-semibold text-lg px-8 py-6 rounded-xl hover:border-[#FF7A00]/60 transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Comment ça marche ?
                </Button>
              </a>
          </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-[#333333]/60 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8844]" />
                <span>Gratuit à 100%</span>
          </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8844]" />
                <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF8844]" />
                <span>Résultats en 5 minutes</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 border-t border-[#333333]/10">
              <StatCard number="92%" label="Taux de matching" icon={TrendingUp} />
              <StatCard number="50K+" label="Candidats actifs" icon={Users} />
              <StatCard number="10K+" label="Offres disponibles" icon={Briefcase} />
            </div>
          </div>

          {/* Right Content - Hero Illustration - Parallel with text */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroIllustration />
        </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ number, label, icon: Icon }: { number: string; label: string; icon: any }) => {
  return (
    <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-lg bg-[#FF7A00]/10">
          <Icon className="w-5 h-5 text-[#FF7A00]" />
      </div>
        <span className="text-3xl md:text-4xl font-black text-[#333333]">{number}</span>
      </div>
      <span className="text-sm text-[#333333]/60 font-medium">{label}</span>
    </div>
  );
};


export default HeroSection;
