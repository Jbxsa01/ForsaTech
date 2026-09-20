import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  FileText,
  User,
  MessageSquare,
  Settings,
  LogOut,
  MapPin,
  DollarSign,
  BookMarked,
  Filter,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedAt: string;
  description: string;
  matchScore?: number;
  savedAt: string;
}

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchSavedJobs();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }
  };

  const fetchSavedJobs = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockJobs: SavedJob[] = [
        {
          id: "1",
          title: "Senior Backend Engineer",
          company: "Tech Corp",
          location: "New York, NY",
          type: "Full-time",
          salary: "$150,000 - $180,000",
          postedAt: "2025-01-05",
          description:
            "We are looking for an experienced backend engineer to join our team.",
          matchScore: 92,
          savedAt: "2025-01-05",
        },
        {
          id: "2",
          title: "Full Stack Developer",
          company: "StartupXYZ",
          location: "Remote",
          type: "Full-time",
          salary: "$100,000 - $130,000",
          postedAt: "2025-01-03",
          description:
            "Join our growing startup and help us build the future.",
          matchScore: 85,
          savedAt: "2025-01-04",
        },
        {
          id: "3",
          title: "Python Engineer",
          company: "Data Solutions Inc",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$120,000 - $150,000",
          postedAt: "2025-01-01",
          description:
            "Work on cutting-edge data science projects.",
          matchScore: 78,
          savedAt: "2025-01-03",
        },
        {
          id: "4",
          title: "Frontend Engineer",
          company: "Design Labs",
          location: "Los Angeles, CA",
          type: "Contract",
          salary: "$80,000 - $110,000",
          postedAt: "2024-12-28",
          description:
            "Create beautiful and responsive user interfaces.",
          matchScore: 88,
          savedAt: "2025-01-02",
        },
      ];
      setSavedJobs(mockJobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSave = (jobId: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
    toast.success("Job removed from saved");
  };

  const handleApply = (jobId: string) => {
    toast.success("Applied to job! Check your applications.");
    navigate("/candidate/applications");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/dashboard" },
    { icon: FileText, label: "Resume", href: "/candidate/resume" },
    { icon: User, label: "Profile", href: "/candidate/profile" },
    { icon: Briefcase, label: "Applications", href: "/candidate/applications" },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved", active: true },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const jobTypes = Array.from(new Set(savedJobs.map((job) => job.type)));

  const filteredJobs = selectedFilter
    ? savedJobs.filter((job) => job.type === selectedFilter)
    : savedJobs;

  const getMatchColor = (score?: number) => {
    if (!score) return "bg-slate-500";
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            ForsaTech
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Saved Jobs</h1>
            <p className="text-muted-foreground mt-2">
              You have {filteredJobs.length} saved job{filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filters */}
          {jobTypes.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap">
              <Button
                onClick={() => setSelectedFilter(null)}
                variant={selectedFilter === null ? "default" : "outline"}
                size="sm"
              >
                All
              </Button>
              {jobTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  variant={selectedFilter === type ? "default" : "outline"}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          )}

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <BookMarked className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  {selectedFilter
                    ? "No saved jobs of this type"
                    : "You haven't saved any jobs yet"}
                </p>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">
                            {job.company}
                          </p>
                        </div>
                        {job.matchScore && (
                          <div
                            className={`${getMatchColor(
                              job.matchScore
                            )} text-white px-3 py-1 rounded-full font-semibold text-sm flex-shrink-0`}
                          >
                            {job.matchScore}%
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            {job.salary}
                          </div>
                        )}
                        <Badge variant="outline">{job.type}</Badge>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Saved on {new Date(job.savedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
                      <Button
                        onClick={() => handleApply(job.id)}
                        size="sm"
                        className="gap-2"
                      >
                        Apply Now
                      </Button>
                      <Button
                        onClick={() => handleRemoveSave(job.id)}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <Heart size={16} fill="currentColor" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedJobs;
