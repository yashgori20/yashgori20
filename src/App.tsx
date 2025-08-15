
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import GetMeAJob from "./pages/GetMeAJob";
import Demo1 from "./pages/Demo1";
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
          <Route path="/demo1" element={<Demo1 />} />
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
