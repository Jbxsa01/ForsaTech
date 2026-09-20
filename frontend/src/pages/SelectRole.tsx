import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Building2 } from "lucide-react";
import { supabase, createUserRole, UserRole } from "@/lib/supabase";
import { toast } from "sonner";
import talentLinkLogo from "@/assets/talentlink-logo.png";

const SelectRole = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (role: UserRole) => {
    try {
      setLoading(true);
      
      // Vérifier le token local
      const token = localStorage.getItem("auth_token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      // Stocker le rôle localement
      localStorage.setItem("user_role", role);
      
      toast.success(`Bienvenue en tant que ${role === "candidate" ? "candidat" : "recruteur"} !`);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Erreur lors de la sélection du rôle");
      console.error("Error setting role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img 
            src={talentLinkLogo} 
            alt="TalentLink" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choisissez votre profil
          </h1>
          <p className="text-muted-foreground">
            Sélectionnez comment vous souhaitez utiliser TalentLink
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRoleSelection("candidate")}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Candidat</h2>
              <p className="text-muted-foreground">
                Trouvez votre emploi idéal, postulez aux offres et découvrez des formations adaptées à votre profil
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>✓ Score de matching IA</li>
                <li>✓ Optimisation de CV pour ATS</li>
                <li>✓ Recommandations de formations</li>
                <li>✓ Suivi des candidatures</li>
              </ul>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                Continuer en tant que Candidat
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRoleSelection("recruiter")}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Building2 className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Recruteur</h2>
              <p className="text-muted-foreground">
                Publiez vos offres d'emploi, découvrez les meilleurs talents et gérez vos recrutements
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>✓ Publier des offres d'emploi</li>
                <li>✓ Matching intelligent des candidats</li>
                <li>✓ Gestion des candidatures</li>
                <li>✓ Accès aux profils qualifiés</li>
              </ul>
              <Button 
                variant="accent" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                Continuer en tant que Recruteur
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
