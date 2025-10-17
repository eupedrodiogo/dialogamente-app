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
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import { SupportWidget } from "./components/SupportWidget";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SupportWidget />
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
          <Route path="/suporte" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
