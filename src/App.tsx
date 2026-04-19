import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Students from "./pages/Students.tsx";
import AddStudent from "./pages/AddStudent.tsx";
import Fees from "./pages/Fees.tsx";
import Results from "./pages/Results.tsx";
import ReportCards from "./pages/ReportCards.tsx";
import Staff from "./pages/Staff.tsx";
import Classes from "./pages/Classes.tsx";
import Subjects from "./pages/Subjects.tsx";
import Attendance from "./pages/Attendance.tsx";
import Settings from "./pages/Settings.tsx";
import Support from "./pages/Support.tsx";
import ParentLogin from "./pages/parent/ParentLogin.tsx";
import ParentDashboard from "./pages/parent/ParentDashboard.tsx";
import AddStaff from "./pages/AddStaff.tsx";
import AdminOverview from "./pages/admin/AdminOverview.tsx";
import AdminSchools from "./pages/admin/AdminSchools.tsx";
import OnboardSchool from "./pages/admin/OnboardSchool.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/new" element={<AddStudent />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/results" element={<Results />} />
          <Route path="/report-cards" element={<ReportCards />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/staff/new" element={<AddStaff />} />
          <Route path="/content" element={<Navigate to="/settings" replace />} />
          <Route path="/fee-structures" element={<Navigate to="/fees" replace />} />
          <Route path="/parent" element={<ParentLogin />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/schools" element={<AdminSchools />} />
          <Route path="/admin/schools/new" element={<OnboardSchool />} />
          <Route path="/admin/billing" element={<AdminOverview />} />
          <Route path="/admin/health" element={<AdminOverview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
