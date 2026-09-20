import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  ArrowLeft, 
  Save,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  LogOut,
  Star,
  BookMarked,
  MessageSquare,
  Settings
} from "lucide-react";
import { toast } from "sonner";

const Resume = () => {
  const navigate = useNavigate();
  const [uploadMode, setUploadMode] = useState<'choose' | 'upload' | 'form'>('choose');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ school: '', degree: '', duration: '', description: '' }],
    skills: '',
    languages: '',
  });

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/dashboard", active: false },
    { icon: FileText, label: "Resume", href: "/candidate/resume", active: true },
    { icon: User, label: "Profile", href: "/candidate/profile", active: false },
    { icon: Star, label: "Applications", href: "/candidate/applications", active: false },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved", active: false },
    { icon: MessageSquare, label: "Messages", href: "/messages", active: false },
    { icon: Settings, label: "Settings", href: "/settings", active: false },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async () => {
    if (!file) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/resumes/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("CV téléchargé avec succès!");
        navigate("/dashboard");
      }
    } catch (error) {
      // Silent error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("CV créé avec succès!");
        navigate("/dashboard");
      }
    } catch (error) {
      // Silent error handling
    } finally {
      setIsLoading(false);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', duration: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  if (uploadMode === 'choose') {
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
        <div className="flex-1 p-8 overflow-auto">
          <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Créez votre CV
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Choisissez comment vous souhaitez créer votre CV
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-6">
              {/* Upload Option */}
              <Card 
                className="p-8 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => setUploadMode('upload')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Télécharger mon CV
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Importez votre CV existant (PDF, DOCX)
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Sparkles className="w-4 h-4" />
                    <span>IA extrait automatiquement les infos</span>
                  </div>
                </div>
              </Card>

              {/* Form Option */}
              <Card 
                className="p-8 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => setUploadMode('form')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Remplir un formulaire
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Créez votre CV étape par étape
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Sparkles className="w-4 h-4" />
                    <span>Guidage intelligent</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (uploadMode === 'upload') {
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
        <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
          <Card className="w-full max-w-2xl p-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-6"
              onClick={() => setUploadMode('choose')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Télécharger votre CV
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Formats acceptés : PDF, DOCX (Max 5MB)
              </p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center mb-6">
              <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
                  Cliquez pour sélectionner
                </span>
                <span className="text-slate-600 dark:text-slate-400"> ou glissez-déposez</span>
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {file && (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  Supprimer
                </Button>
              </div>
            )}

            <Button 
              className="w-full"
              disabled={!file || isLoading}
              onClick={handleUploadSubmit}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Télécharger le CV
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Form mode
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
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => setUploadMode('choose')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Créer votre CV
            </h2>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Informations personnelles
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
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
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé professionnel */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Résumé professionnel
                </h3>
              </div>
              <Textarea
                placeholder="Décrivez brièvement votre profil et vos objectifs professionnels..."
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
              />
            </div>

            {/* Expérience professionnelle */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Expérience professionnelle
                  </h3>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                  Ajouter
                </Button>
              </div>
              {formData.experience.map((exp, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Entreprise</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Poste</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Période</Label>
                      <Input
                        placeholder="Ex: 2020 - 2023"
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Formation */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Formation
                  </h3>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                  Ajouter
                </Button>
              </div>
              {formData.education.map((edu, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>École/Université</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Diplôme</Label>
                      <Input
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
                        value={edu.description}
                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Compétences */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Compétences
                </h3>
              </div>
              <Textarea
                placeholder="Ex: JavaScript, React, Node.js, Python, SQL..."
                rows={3}
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>

            {/* Langues */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Languages className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Langues
                </h3>
              </div>
              <Textarea
                placeholder="Ex: Français (natif), Anglais (courant), Arabe (intermédiaire)..."
                rows={2}
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Enregistrer le CV
                </>
              )}
            </Button>
          </form>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Resume;
