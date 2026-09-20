import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  User,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Mail,
  Phone,
  Briefcase,
  FileText,
  LogOut,
  Star,
  BookMarked,
  MessageSquare,
  Settings,
  GraduationCap,
  Award,
  Languages as LanguagesIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { ProfileData, ExperienceItem, EducationItem } from "@/types/profile";

const ProfilePreview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileData | null>(null);
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([]);
  const [educationList, setEducationList] = useState<EducationItem[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
          
          // Parse JSON fields
          if (json.experienceJson) {
            try {
              setExperienceList(JSON.parse(json.experienceJson));
            } catch (e) {
              console.error("Error parsing experience:", e);
            }
          }
          if (json.educationJson) {
            try {
              setEducationList(JSON.parse(json.educationJson));
            } catch (e) {
              console.error("Error parsing education:", e);
            }
          }
        }
      } catch (e) {
        // noop
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/dashboard", active: false },
    { icon: FileText, label: "Resume", href: "/candidate/resume", active: false },
    { icon: User, label: "Profile", href: "/candidate/profile", active: true },
    { icon: Star, label: "Applications", href: "/candidate/applications", active: false },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved", active: false },
    { icon: MessageSquare, label: "Messages", href: "/messages", active: false },
    { icon: Settings, label: "Settings", href: "/settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ForsaTech" className="h-10 w-10" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">ForsaTech</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-primary text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profil — Vue recruteur</h1>
              <p className="text-slate-600 dark:text-slate-400">Aperçu public de votre profil tel qu'un recruteur le voit</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/candidate/profile")}>Modifier</Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl flex-shrink-0">
                {data?.profileImage ? (
                  <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {data ? `${data.firstName || ''} ${data.lastName || ''}`.trim() : '—'}
                </h2>
                <p className="text-xl text-slate-700 dark:text-slate-300 mb-3">
                  {data?.currentPosition || 'Poste non renseigné'}
                  {data?.company ? ` • ${data.company}` : ''}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                  {data?.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {data.location}
                    </span>
                  )}
                  {data?.experience && (
                    <span className="inline-flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {data.experience}
                    </span>
                  )}
                  {data?.email && (
                    <span className="inline-flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {data.email}
                    </span>
                  )}
                  {data?.phone && (
                    <span className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {data.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {data?.bio && (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">À propos</h3>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{data.bio}</p>
              </div>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              {data?.website && (
                <a 
                  href={data.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <Globe className="w-4 h-4" /> Portfolio
                </a>
              )}
              {data?.linkedin && (
                <a 
                  href={data.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-blue-700 dark:text-blue-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {data?.github && (
                <a 
                  href={data.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
            </div>
          </Card>

          {/* Professional Summary */}
          {data?.summary && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résumé professionnel
              </h3>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{data.summary}</p>
            </Card>
          )}

          {/* Experience */}
          {experienceList.length > 0 && experienceList.some(exp => exp.company || exp.position) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Expérience professionnelle
              </h3>
              <div className="space-y-6">
                {experienceList.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{exp.position || 'Poste'}</h4>
                    <p className="text-primary font-medium">{exp.company || 'Entreprise'}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1 mb-2">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Education */}
          {educationList.length > 0 && educationList.some(edu => edu.school || edu.degree) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Formation
              </h3>
              <div className="space-y-6">
                {educationList.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{edu.degree || 'Diplôme'}</h4>
                    <p className="text-primary font-medium">{edu.school || 'École'}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1 mb-2">{edu.duration}</p>
                    {edu.description && (
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Skills and Languages */}
          {(data?.skills || data?.languages) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Compétences et Langues
              </h3>
              {data.skills && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">Compétences</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.split(',').map((skill: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.languages && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <LanguagesIcon className="w-4 h-4" />
                    Langues
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.split(',').map((lang: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                      >
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
