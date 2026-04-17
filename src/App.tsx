import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ParentLogin from "./pages/parent/ParentLogin.tsx";
import ParentDashboard from "./pages/parent/ParentDashboard.tsx";
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
          <Route path="/parent" element={<ParentLogin />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
