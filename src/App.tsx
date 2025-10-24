import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scope from "./pages/Scope";
import Instructions from "./pages/Instructions";
import Test from "./pages/Test";
import Reviews from "./pages/Reviews";
import Results from "./pages/Results";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminCoupons from "./pages/AdminCoupons";
import AdminPlans from "./pages/AdminPlans";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import { SupportWidget } from "./components/SupportWidget";
import AdminAccess, { DevAdminButton } from "./components/AdminAccess";
import AdminTestPanel from "./components/AdminTestPanel";
import PremiumDemo from "./pages/PremiumDemo";
// Premium Pages
import PremiumDashboard from "./pages/PremiumDashboard";
import PremiumReports from "./pages/PremiumReports";
import ExclusiveContent from "./pages/ExclusiveContent";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import DataExport from "./pages/DataExport";
import APIAccess from "./pages/APIAccess";
import VIPSupport from "./pages/VIPSupport";
import { AuthProvider } from "./contexts/AuthContext";
import { PremiumProvider } from "./contexts/PremiumContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PremiumProvider>
            <AdminAccess>
              <SupportWidget />
              <DevAdminButton />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/scope" element={<Scope />} />
                <Route path="/instrucoes" element={<Instructions />} />
                <Route path="/test" element={<Test />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/resultados-admin" element={<Results />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/admin-coupons" element={<AdminCoupons />} />
                <Route path="/admin/cupons" element={<AdminCoupons />} />
                <Route path="/admin/plans" element={<AdminPlans />} />
                <Route path="/admin/planos" element={<AdminPlans />} />
                <Route path="/admin/test" element={<AdminTestPanel />} />
                <Route path="/admin/teste" element={<AdminTestPanel />} />
                <Route path="/premium" element={<PremiumDemo />} />
                <Route path="/premium-demo" element={<PremiumDemo />} />
                {/* Premium Pages Routes */}
                <Route path="/premium/dashboard" element={<PremiumDashboard />} />
                <Route path="/premium/relatorios" element={<PremiumReports />} />
                <Route path="/premium/reports" element={<PremiumReports />} />
                <Route path="/premium/conteudo-exclusivo" element={<ExclusiveContent />} />
                <Route path="/premium/exclusive-content" element={<ExclusiveContent />} />
                <Route path="/premium/analytics" element={<AdvancedAnalytics />} />
                <Route path="/premium/analytics-avancados" element={<AdvancedAnalytics />} />
                <Route path="/premium/exportacao" element={<DataExport />} />
                <Route path="/premium/data-export" element={<DataExport />} />
                <Route path="/premium/api" element={<APIAccess />} />
                <Route path="/premium/api-access" element={<APIAccess />} />
                <Route path="/premium/suporte-vip" element={<VIPSupport />} />
                <Route path="/premium/vip-support" element={<VIPSupport />} />
                <Route path="/suporte" element={<Support />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdminAccess>
          </PremiumProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
