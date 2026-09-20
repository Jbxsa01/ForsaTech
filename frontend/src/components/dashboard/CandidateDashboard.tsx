import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  FileText, 
  User, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  Filter,
  Star,
  BookMarked
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedAt: string;
  matchScore?: number;
}

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string; timestamp: number }[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant ForsaTech. Posez-moi une question sur votre recherche d'emploi, vos candidatures ou votre CV.",
      timestamp: Date.now(),
    },
  ]);

  // Temporairement désactivé - en attente de l'implémentation du scraping
  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  const fetchJobs = async () => {
    // Temporairement désactivé
    // try {
    //   const token = localStorage.getItem("auth_token");
    //   const response = await fetch("/api/jobs", {
    //     headers: {
    //       "Authorization": `Bearer ${token}`,
    //       "Content-Type": "application/json"
    //     }
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setJobs(data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching jobs:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    const userMsg = { id: crypto.randomUUID(), role: "user" as const, content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text, history: messages.slice(-10).map(({ role, content }) => ({ role, content })) }),
      });
      let reply = "Je n'ai pas pu contacter le service de chat. Voici une réponse de démonstration.";
      if (res.ok) {
        const data = await res.json();
        // Support common shapes: {reply}, {message}, {content}
        reply = data.reply || data.message || data.content || reply;
      } else {
        // Fallback simple echo
        reply = `Vous avez dit: ${text}`;
      }
      const botMsg = { id: crypto.randomUUID(), role: "assistant" as const, content: reply, timestamp: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const botMsg = { id: crypto.randomUUID(), role: "assistant" as const, content: "Désolé, une erreur réseau est survenue.", timestamp: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    
    toast.success("Déconnecté avec succès");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/jobs", active: true },
    { icon: FileText, label: "Resume", href: "/candidate/resume" },
    { icon: User, label: "Profile", href: "/candidate/profile" },
    { icon: Star, label: "Applications", href: "/candidate/applications" },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const jobFilters = [
    "Backend Engineer",
    "Full Stack Engineer", 
    "Python Engineer",
    "Java Engineer",
    "C/C++ Engineer",
    ".Net Engineer",
    "AI Engineer",
    "Machine Learning Engineer"
  ];

  const getMatchColor = (score?: number) => {
    if (!score) return "bg-slate-500";
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    return "bg-orange-500";
  };

  const getMatchLabel = (score?: number) => {
    if (!score) return "MATCH";
    if (score >= 90) return "STRONG MATCH";
    if (score >= 70) return "GOOD MATCH";
    return "FAIR MATCH";
  };

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
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">JOBS</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Recommended
              </Badge>
              <Badge variant="outline" className="text-sm">
                Liked <span className="ml-1 bg-slate-200 dark:bg-slate-700 px-1.5 rounded">0</span>
              </Badge>
              <Badge variant="outline" className="text-sm">
                Applied <span className="ml-1 bg-slate-200 dark:bg-slate-700 px-1.5 rounded">0</span>
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {jobFilters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => {
                  setSelectedFilters(prev =>
                    prev.includes(filter)
                      ? prev.filter(f => f !== filter)
                      : [...prev, filter]
                  );
                }}
              >
                {filter}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Edit Filters
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
            />
          </div>
        </header>

        {/* Jobs List */}
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Chargement des offres...</p>
            </div>
          ) : jobs.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Aucune offre disponible
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Les offres d'emploi apparaîtront ici une fois qu'elles seront disponibles.
              </p>
              <Button onClick={() => navigate("/candidate/profile")}>
                <Sparkles className="w-4 h-4 mr-2" />
                Compléter mon profil
              </Button>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex gap-6">
                  {/* Company Logo */}
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                          {job.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {job.company}
                        </p>
                      </div>
                      <Badge className={`${getMatchColor(job.matchScore)} text-white px-4 py-2`}>
                        {job.matchScore ? `${job.matchScore}%` : "NEW"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Posted {job.postedAt}
                      </span>
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>

                  {/* Match Score Circle */}
                  {job.matchScore && (
                    <div className="flex flex-col items-center justify-center w-32 flex-shrink-0">
                      <div className={`w-24 h-24 rounded-full ${getMatchColor(job.matchScore)} flex items-center justify-center mb-2`}>
                        <div className="text-center text-white">
                          <div className="text-2xl font-bold">{job.matchScore}%</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {getMatchLabel(job.matchScore)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Right Sidebar - AI Assistant */}
      <aside className="w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.png" alt="ForsaTech" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Assistant ForsaTech</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Chatbot</p>
          </div>
        </div>
        <Card className="flex-1 p-4 overflow-auto">
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                {m.role === "assistant" ? (
                  <img src="/logo.png" alt="Bot" className="w-8 h-8 rounded-full flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">Vous</div>
                )}
                {/* Bubble */}
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  m.role === "user" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                }`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="mt-4">
          <div className="relative">
            <Input
              placeholder="Écrivez votre message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={chatLoading}
              className="pr-24"
            />
            <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => sendMessage()} disabled={chatLoading || !chatInput.trim()}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CandidateDashboard;
