import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
  Linkedin,
  Github,
  Save,
  Upload,
  Camera,
  FileText,
  LogOut,
  Star,
  BookMarked,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  Languages,
  Shield,
  Sparkles,
  TrendingUp,
  Target,
  Brain,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import type { ExperienceItem, EducationItem } from "@/types/profile";

const ProfileTabs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    bio: '',
    currentPosition: '',
    company: '',
    experience: '',
    website: '',
    linkedin: '',
    github: '',
    address: '',
    summary: '',
    skills: '',
    languages: '',
  });

  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([
    { company: '', position: '', duration: '', description: '' }
  ]);

  const [educationList, setEducationList] = useState<EducationItem[]>([
    { school: '', degree: '', duration: '', description: '' }
  ]);

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
        if (data.experienceJson) {
          try {
            setExperienceList(JSON.parse(data.experienceJson));
          } catch (e) {
            console.error("Error parsing experience:", e);
          }
        }
        if (data.educationJson) {
          try {
            setEducationList(JSON.parse(data.educationJson));
          } catch (e) {
            console.error("Error parsing education:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', imageFile);
        
        await fetch("/api/profile/image", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: imageFormData,
        });
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          experienceJson: JSON.stringify(experienceList),
          educationJson: JSON.stringify(educationList),
        }),
      });

      if (response.ok) {
        toast.success("Profil mis à jour avec succès!");
      } else {
        toast.error("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const addExperience = () => {
    setExperienceList([...experienceList, { company: '', position: '', duration: '', description: '' }]);
  };

  const removeExperience = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
    const newList = [...experienceList];
    newList[index] = { ...newList[index], [field]: value };
    setExperienceList(newList);
  };

  const addEducation = () => {
    setEducationList([...educationList, { school: '', degree: '', duration: '', description: '' }]);
  };

  const removeEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const newList = [...educationList];
    newList[index] = { ...newList[index], [field]: value };
    setEducationList(newList);
  };

  const analyzeProfile = async () => {
    setIsAnalyzing(true);
    try {
      // Simulation d'analyse AI
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const skills = formData.skills.toLowerCase();
      const hasJavaScript = skills.includes('javascript') || skills.includes('js');
      const hasPython = skills.includes('python');
      const hasReact = skills.includes('react');
      
      const analysis = {
        score: 85,
        strengths: [
          'Profil complet et détaillé',
          'Expérience professionnelle solide',
          'Compétences techniques diversifiées'
        ],
        improvements: [
          'Ajouter plus de détails sur vos réalisations',
          'Quantifier vos impacts avec des chiffres',
          'Mettre à jour votre portfolio'
        ],
        recommendations: [
          {
            title: hasReact ? 'Advanced React Patterns' : 'React - The Complete Guide',
            platform: 'Udemy',
            duration: '40 heures',
            level: hasReact ? 'Avancé' : 'Débutant',
            relevance: 95
          },
          {
            title: hasPython ? 'Machine Learning A-Z' : 'Python for Data Science',
            platform: 'Coursera',
            duration: '30 heures',
            level: hasPython ? 'Intermédiaire' : 'Débutant',
            relevance: 88
          },
          {
            title: 'AWS Certified Solutions Architect',
            platform: 'AWS Training',
            duration: '20 heures',
            level: 'Intermédiaire',
            relevance: 82
          },
          {
            title: hasJavaScript ? 'TypeScript: Advanced Types' : 'TypeScript Fundamentals',
            platform: 'Frontend Masters',
            duration: '15 heures',
            level: hasJavaScript ? 'Avancé' : 'Débutant',
            relevance: 90
          }
        ]
      };
      
      setAiAnalysis(analysis);
      toast.success('Analyse du profil terminée !');
    } catch (error) {
      toast.error('Erreur lors de l\'analyse');
    } finally {
      setIsAnalyzing(false);
    }
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
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ForsaTech" className="h-10 w-10" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">ForsaTech</span>
          </Link>
        </div>

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

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 text-sm text-green-600">
              <Shield className="w-4 h-4" />
              <span>Vos données de profil sont privées et sécurisées</span>
            </div>
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <Label 
                    htmlFor="profile-image" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {formData.currentPosition || 'Poste non renseigné'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/candidate/profile/preview')}>
                  Aperçu Public
                </Button>
                <Button variant="outline" onClick={() => navigate('/candidate/resume')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Gérer mon CV
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="personal" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all">
                  <User className="w-4 h-4 mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all">
                  <Award className="w-4 h-4 mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all">
                  <Globe className="w-4 h-4 mr-2" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 font-medium transition-all">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Insights
                </TabsTrigger>
              </TabsList>

              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Informations Personnelles
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="firstName"
                          className="pl-10"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="phone"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Localisation</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="location"
                          className="pl-10"
                          placeholder="Ville, Pays"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date de naissance</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          className="pl-10"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adresse complète</Label>
                      <Input
                        id="address"
                        placeholder="Adresse complète"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio / À propos</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        placeholder="Décrivez-vous en quelques mots..."
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Poste Actuel
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentPosition">Poste</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="currentPosition"
                          className="pl-10"
                          placeholder="Ex: Développeur Full Stack"
                          value={formData.currentPosition}
                          onChange={(e) => setFormData({...formData, currentPosition: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        placeholder="Ex: ForsaTech"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Formation
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {educationList.map((edu, index) => (
                      <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative">
                        {educationList.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeEducation(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>École / Université *</Label>
                            <Input
                              placeholder="Ex: MIT"
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Diplôme *</Label>
                            <Input
                              placeholder="Ex: Master en Informatique"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Période</Label>
                            <Input
                              placeholder="Ex: 2016 - 2020"
                              value={edu.duration}
                              onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              rows={2}
                              placeholder="Mention, spécialisation, projets notables..."
                              value={edu.description}
                              onChange={(e) => updateEducation(index, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Work Experience Tab */}
              <TabsContent value="experience" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Expérience Professionnelle
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {experienceList.map((exp, index) => (
                      <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg relative">
                        {experienceList.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Entreprise *</Label>
                            <Input
                              placeholder="Ex: Google"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Poste *</Label>
                            <Input
                              placeholder="Ex: Développeur Senior"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Période</Label>
                            <Input
                              placeholder="Ex: Jan 2020 - Présent"
                              value={exp.duration}
                              onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              rows={3}
                              placeholder="Décrivez vos responsabilités et réalisations..."
                              value={exp.description}
                              onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Résumé Professionnel
                  </h3>
                  <div>
                    <Label htmlFor="summary">Décrivez votre parcours et vos objectifs</Label>
                    <Textarea
                      id="summary"
                      rows={4}
                      placeholder="Résumé de votre carrière et objectifs professionnels..."
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Compétences
                  </h3>
                  <div>
                    <Label htmlFor="skills">Compétences Techniques et Soft Skills</Label>
                    <Textarea
                      id="skills"
                      rows={6}
                      placeholder="Ex: JavaScript, React, Node.js, Python, SQL, Leadership, Communication, Gestion de projet..."
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Listez vos compétences séparées par des virgules ou des retours à la ligne
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    Langues
                  </h3>
                  <div>
                    <Label htmlFor="languages">Langues Parlées</Label>
                    <Input
                      id="languages"
                      placeholder="Ex: Français (natif), Anglais (courant), Arabe (intermédiaire)"
                      value={formData.languages}
                      onChange={(e) => setFormData({...formData, languages: e.target.value})}
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="ai" className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analyse AI de votre profil</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Optimisez votre profil avec l'intelligence artificielle</p>
                      </div>
                    </div>
                    <Button 
                      type="button"
                      onClick={analyzeProfile}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Analyse en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Analyser mon profil
                        </>
                      )}
                    </Button>
                  </div>

                  {aiAnalysis && (
                    <div className="space-y-6">
                      {/* Score */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Score du profil</h4>
                          <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {aiAnalysis.score}/100
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                            style={{ width: `${aiAnalysis.score}%` }}
                          />
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Points forts
                        </h4>
                        <ul className="space-y-3">
                          {aiAnalysis.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-orange-500" />
                          Axes d'amélioration
                        </h4>
                        <ul className="space-y-3">
                          {aiAnalysis.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Recommended Courses */}
                {aiAnalysis && (
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                      Formations recommandées
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      Basées sur votre profil et vos compétences actuelles
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {aiAnalysis.recommendations.map((course: any, index: number) => (
                        <div 
                          key={index} 
                          className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-md"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{course.title}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{course.platform}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                              <Sparkles className="w-3 h-3" />
                              {course.relevance}%
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {course.duration}
                            </span>
                            <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs">
                              {course.level}
                            </span>
                          </div>
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => toast.info('Redirection vers la formation...')}
                          >
                            Voir la formation
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Social Links Tab */}
              <TabsContent value="social" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Liens Sociaux et Portfolio
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="website">Site web / Portfolio</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="website"
                          type="url"
                          className="pl-10"
                          placeholder="https://votre-portfolio.com"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="linkedin"
                          type="url"
                          className="pl-10"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="github"
                          type="url"
                          className="pl-10"
                          placeholder="https://github.com/username"
                          value={formData.github}
                          onChange={(e) => setFormData({...formData, github: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <div className="flex gap-4 mt-6">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
