import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Briefcase,
  FileText,
  User as UserIcon,
  Star,
  BookMarked,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
  Shield,
  Bell,
  Eye,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

interface SettingsData {
  account: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio?: string;
  };
  notifications: {
    jobAlerts: boolean;
    applicationUpdates: boolean;
    recruiterMessages: boolean;
    newsletter: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
}

const Settings = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    account: { firstName: "", lastName: "", email: "", phone: "", bio: "" },
    notifications: {
      jobAlerts: true,
      applicationUpdates: true,
      recruiterMessages: true,
      newsletter: false,
    },
    privacy: {
      profileVisible: true,
      showEmail: true,
      showPhone: false,
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch("/api/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setSettings((prev) => ({ ...prev, ...json }));
        }
      } catch (e) {
        // silent fail, keep defaults
      }
    };
    fetchSettings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const saveAccount = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/settings/account", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings.account),
      });
      if (res.ok) toast.success("Compte mis à jour");
      else toast.error("Échec de la mise à jour du compte");
    } catch (e) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const saveNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings.notifications),
      });
      if (res.ok) toast.success("Notifications mises à jour");
      else toast.error("Échec de la mise à jour des notifications");
    } catch (e) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const savePrivacy = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/settings/privacy", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings.privacy),
      });
      if (res.ok) toast.success("Confidentialité mise à jour");
      else toast.error("Échec de la mise à jour de la confidentialité");
    } catch (e) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (current: string, next: string, confirm: string) => {
    if (!current || !next) return toast.error("Mot de passe requis");
    if (next !== confirm) return toast.error("Les mots de passe ne correspondent pas");
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/settings/password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      if (res.ok) toast.success("Mot de passe mis à jour");
      else toast.error("Échec de la mise à jour du mot de passe");
    } catch (e) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    const sure = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (!sure) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/settings/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Compte supprimé");
        handleLogout();
      } else {
        toast.error("Échec de la suppression du compte");
      }
    } catch (e) {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  // Local state for password form
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/dashboard", active: false },
    { icon: FileText, label: "Resume", href: "/candidate/resume", active: false },
    { icon: UserIcon, label: "Profile", href: "/candidate/profile", active: false },
    { icon: Star, label: "Applications", href: "/candidate/applications", active: false },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved", active: false },
    { icon: MessageSquare, label: "Messages", href: "/messages", active: false },
    { icon: SettingsIcon, label: "Settings", href: "/settings", active: true },
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Paramètres</h1>
            <p className="text-slate-600 dark:text-slate-400">Gérez votre compte, sécurité, notifications et confidentialité</p>
          </div>

          {/* Account */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Compte</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Prénom</Label>
                <Input
                  value={settings.account.firstName}
                  onChange={(e) => setSettings({ ...settings, account: { ...settings.account, firstName: e.target.value } })}
                />
              </div>
              <div>
                <Label>Nom</Label>
                <Input
                  value={settings.account.lastName}
                  onChange={(e) => setSettings({ ...settings, account: { ...settings.account, lastName: e.target.value } })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.account.email}
                  onChange={(e) => setSettings({ ...settings, account: { ...settings.account, email: e.target.value } })}
                />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input
                  value={settings.account.phone}
                  onChange={(e) => setSettings({ ...settings, account: { ...settings.account, phone: e.target.value } })}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  value={settings.account.bio}
                  onChange={(e) => setSettings({ ...settings, account: { ...settings.account, bio: e.target.value } })}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={saveAccount} disabled={loading}>Enregistrer</Button>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Sécurité</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Mot de passe actuel</Label>
                <Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
              </div>
              <div>
                <Label>Nouveau mot de passe</Label>
                <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
              </div>
              <div>
                <Label>Confirmer</Label>
                <Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => changePassword(pw.current, pw.next, pw.confirm)} disabled={loading}>Mettre à jour</Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Alertes d'offres d'emploi</span>
                <Switch
                  checked={settings.notifications.jobAlerts}
                  onCheckedChange={(v) => setSettings({ ...settings, notifications: { ...settings.notifications, jobAlerts: v } })}
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Mises à jour des candidatures</span>
                <Switch
                  checked={settings.notifications.applicationUpdates}
                  onCheckedChange={(v) => setSettings({ ...settings, notifications: { ...settings.notifications, applicationUpdates: v } })}
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Messages des recruteurs</span>
                <Switch
                  checked={settings.notifications.recruiterMessages}
                  onCheckedChange={(v) => setSettings({ ...settings, notifications: { ...settings.notifications, recruiterMessages: v } })}
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Newsletter</span>
                <Switch
                  checked={settings.notifications.newsletter}
                  onCheckedChange={(v) => setSettings({ ...settings, notifications: { ...settings.notifications, newsletter: v } })}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={saveNotifications} disabled={loading}>Enregistrer</Button>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Confidentialité</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Rendre mon profil visible aux recruteurs</span>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(v) => setSettings({ ...settings, privacy: { ...settings.privacy, profileVisible: v } })}
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Afficher mon email</span>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(v) => setSettings({ ...settings, privacy: { ...settings.privacy, showEmail: v } })}
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">Afficher mon téléphone</span>
                <Switch
                  checked={settings.privacy.showPhone}
                  onCheckedChange={(v) => setSettings({ ...settings, privacy: { ...settings.privacy, showPhone: v } })}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={savePrivacy} disabled={loading}>Enregistrer</Button>
            </div>
          </Card>

          {/* Danger zone */}
          <Card className="p-6 border-red-200 dark:border-red-900">
            <div className="flex items-center gap-3 mb-3 text-red-600 dark:text-red-400">
              <Trash2 className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Zone de danger</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Supprimer définitivement votre compte et toutes vos données.</p>
            <Button variant="destructive" onClick={deleteAccount} disabled={loading}>Supprimer mon compte</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
