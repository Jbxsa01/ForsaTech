import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Languages
} from "lucide-react";
import { toast } from "sonner";
import type { ExperienceItem, EducationItem } from "@/types/profile";

const Profile = () => {
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
        // Parse JSON fields
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
      
      // Preview
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
      
      // Upload image first if exists
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

      // Update profile
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
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Mon Profil
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Gérez vos informations personnelles et professionnelles
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button variant="outline" onClick={() => navigate('/candidate/profile/preview')}>
                Voir comme recruteur
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Photo de profil
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                  <Label 
                    htmlFor="profile-image" 
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Formats acceptés: JPG, PNG, GIF (Max 2MB)
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('profile-image')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Changer la photo
                  </Button>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Informations personnelles
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
                      type="tel"
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
              </div>
              <div className="mt-4">
                <Label htmlFor="bio">Bio / À propos</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  placeholder="Décrivez-vous en quelques mots..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </Card>

            {/* Professional Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Informations professionnelles
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentPosition">Poste actuel</Label>
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
                  <Label htmlFor="company">Entreprise actuelle</Label>
                  <Input
                    id="company"
                    placeholder="Ex: ForsaTech"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="experience">Années d'expérience</Label>
                  <Input
                    id="experience"
                    placeholder="Ex: 5 ans"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
              </div>
            </Card>

            {/* CV Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résumé professionnel
              </h3>
              <div>
                <Label htmlFor="summary">Résumé / Objectif de carrière</Label>
                <Textarea
                  id="summary"
                  rows={4}
                  placeholder="Décrivez votre parcours et vos objectifs professionnels..."
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                />
              </div>
            </Card>

            {/* Experience Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Expérience professionnelle
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
                        <Label>Entreprise</Label>
                        <Input
                          placeholder="Ex: Google"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Poste</Label>
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

            {/* Education Section */}
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
                        <Label>École / Université</Label>
                        <Input
                          placeholder="Ex: MIT"
                          value={edu.school}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Diplôme</Label>
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

            {/* Skills and Languages */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Compétences et Langues
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">Compétences</Label>
                  <Textarea
                    id="skills"
                    rows={3}
                    placeholder="Ex: JavaScript, React, Node.js, Python, SQL..."
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="languages" className="flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    Langues
                  </Label>
                  <Input
                    id="languages"
                    placeholder="Ex: Français (natif), Anglais (courant), Arabe"
                    value={formData.languages}
                    onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  />
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Liens sociaux
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

            {/* Submit Button */}
            <div className="flex gap-4">
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

export default Profile;
