
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import GetMeAJob from "./pages/GetMeAJob";
import GetMeAJobLogin from "./pages/GetMeAJobLogin";
import GetMeAJobDashboard from "./pages/GetMeAJobDashboard";
import GetMeAJobDownload from "./pages/GetMeAJobDownload";
import Et from "./pages/Et";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getmeajob" element={<GetMeAJob />} />
          <Route path="/getmeajob/login" element={<GetMeAJobLogin />} />
          <Route path="/getmeajob/dashboard" element={<GetMeAJobDashboard />} />
          <Route path="/getmeajob/download" element={<GetMeAJobDownload />} />
          <Route path="/et" element={<Et />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
