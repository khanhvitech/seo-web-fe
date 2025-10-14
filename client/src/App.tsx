import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import Content from "@/pages/Content";
import Websites from "@/pages/Websites";
import Scheduling from "@/pages/Scheduling";
import Publishing from "@/pages/Publishing";
import Notifications from "@/pages/Notifications";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/content" />} />
      <Route path="/content" component={Content} />
      <Route path="/websites" component={Websites} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/publishing" component={Publishing} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/seo">SEO Page (Coming Soon)</Route>
      <Route path="/analytics">Analytics Page (Coming Soon)</Route>
      <Route path="/settings">Settings Page (Coming Soon)</Route>
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 bg-background">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
