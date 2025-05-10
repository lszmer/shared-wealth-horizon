
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/categories/Home";
import Investments from "./pages/categories/Investments";
import Vehicles from "./pages/categories/Vehicles";
import Insurance from "./pages/categories/Insurance";
import Valuables from "./pages/categories/Valuables";
import Loans from "./pages/categories/Loans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/valuables" element={<Valuables />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
