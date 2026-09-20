import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, getUserRole, UserRole } from "@/lib/supabase";
import CandidateDashboard from "@/components/dashboard/CandidateDashboard";
import RecruiterDashboard from "@/components/dashboard/RecruiterDashboard";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Vérifier d'abord le token local
      const token = localStorage.getItem("auth_token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      // Vérifier le rôle stocké localement
      const storedRole = localStorage.getItem("user_role") as UserRole | null;
      
      if (!storedRole) {
        // User hasn't selected a role yet, redirect to role selection
        navigate("/select-role");
        return;
      }

      setUserRole(storedRole);
    } catch (error) {
      console.error("Error checking user:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (userRole === "candidate") {
    return <CandidateDashboard />;
  }

  if (userRole === "recruiter") {
    return <RecruiterDashboard />;
  }

  return null;
};

export default Dashboard;
