import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, Building2, LogOut, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import talentLinkLogo from "@/assets/talentlink-logo.png";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Supprimer les tokens locaux
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Briefcase,
      title: "Mes Offres",
      description: "Gérez vos offres d'emploi publiées",
      href: "/recruiter/jobs",
      color: "primary",
    },
    {
      icon: Users,
      title: "Candidatures",
      description: "Consultez les candidatures reçues",
      href: "/recruiter/applications",
      color: "accent",
    },
    {
      icon: Building2,
      title: "Mon Profil Entreprise",
      description: "Complétez les informations de votre entreprise",
      href: "/recruiter/profile",
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src={talentLinkLogo} alt="TalentLink" className="h-10 w-auto" />
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tableau de bord - Recruteur
            </h1>
            <p className="text-muted-foreground">
              Bienvenue sur votre espace recruteur
            </p>
          </div>
          <Link to="/recruiter/jobs/new">
            <Button variant="hero" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Publier une offre
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-${item.color}/10 flex items-center justify-center group-hover:bg-${item.color}/20 transition-colors`}>
                    <item.icon className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
