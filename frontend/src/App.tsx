import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import SelectRole from "./pages/SelectRole";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/candidate/Resume";
import Profile from "./pages/candidate/Profile";
import ProfileTabs from "./pages/candidate/ProfileTabs";
import ProfilePreview from "./pages/candidate/ProfilePreview";
import Settings from "./pages/Settings";
import Applications from "./pages/candidate/Applications";
import Messages from "./pages/Messages";
import SavedJobs from "./pages/candidate/SavedJobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidate/resume" element={<Resume />} />
          <Route path="/candidate/profile" element={<ProfileTabs />} />
          <Route path="/candidate/profile/preview" element={<ProfilePreview />} />
          <Route path="/candidate/applications" element={<Applications />} />
          <Route path="/candidate/saved" element={<SavedJobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
