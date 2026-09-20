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
  Clock,
  MapPin,
  DollarSign,
  Filter,
  ChevronRight,
  Calendar,
  BookMarked,
} from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedAt: string;
  status: "pending" | "rejected" | "interview" | "accepted";
  salary?: string;
  jobType?: string;
}

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchApplications();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      // Mock data for now - replace with actual API call
      const mockApplications: Application[] = [
        {
          id: "1",
          jobId: "job1",
          jobTitle: "Senior Backend Engineer",
          company: "Tech Corp",
          location: "New York, NY",
          appliedAt: "2025-01-05",
          status: "interview",
          salary: "$150,000 - $180,000",
          jobType: "Full-time",
        },
        {
          id: "2",
          jobId: "job2",
          jobTitle: "Full Stack Developer",
          company: "StartupXYZ",
          location: "Remote",
          appliedAt: "2025-01-03",
          status: "pending",
          salary: "$100,000 - $130,000",
          jobType: "Full-time",
        },
        {
          id: "3",
          jobId: "job3",
          jobTitle: "Python Engineer",
          company: "Data Solutions Inc",
          location: "San Francisco, CA",
          appliedAt: "2025-01-01",
          status: "rejected",
          salary: "$120,000 - $150,000",
          jobType: "Full-time",
        },
      ];
      setApplications(mockApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "interview":
        return "Interview";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleLogout = async () => {
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
    { icon: Briefcase, label: "Applications", href: "/candidate/applications", active: true },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const filteredApplications = selectedStatus
    ? applications.filter((app) => app.status === selectedStatus)
    : applications;

  const statuses = ["pending", "interview", "accepted", "rejected"];

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
            <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground mt-2">Track all your job applications</p>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <Button
              onClick={() => setSelectedStatus(null)}
              variant={selectedStatus === null ? "default" : "outline"}
              size="sm"
            >
              All ({applications.length})
            </Button>
            {statuses.map((status) => {
              const count = applications.filter((app) => app.status === status).length;
              return (
                <Button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                >
                  {getStatusLabel(status)} ({count})
                </Button>
              );
            })}
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card className="p-12 text-center">
                <Briefcase className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  No applications found
                </p>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card
                  key={application.id}
                  className="p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {application.jobTitle}
                        </h3>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusLabel(application.status)}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground font-medium mb-3">
                        {application.company}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {application.location}
                        </div>
                        {application.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            {application.salary}
                          </div>
                        )}
                        {application.jobType && (
                          <div className="flex items-center gap-1">
                            <Briefcase size={16} />
                            {application.jobType}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="ml-4">
                      <ChevronRight size={20} />
                    </Button>
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

export default Applications;
