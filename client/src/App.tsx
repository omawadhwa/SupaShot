import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Editor from "@/pages/Editor";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "next-themes";

function Router() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar />
      <main className="container mx-auto px-4">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/editor" component={Editor} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
