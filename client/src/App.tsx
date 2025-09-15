import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import MainLayout from "@/components/layout/main-layout";
import Dashboard from "@/pages/dashboard";
import Sales from "@/pages/sales";
import CRM from "@/pages/crm";
import Inventory from "@/pages/inventory";
import Accounting from "@/pages/accounting";
import HR from "@/pages/hr";
import Project from "@/pages/project";
import Manufacturing from "@/pages/manufacturing";
import Purchase from "@/pages/purchase";
import Website from "@/pages/website";
import Ecommerce from "@/pages/ecommerce";
import POS from "@/pages/pos";
import Marketing from "@/pages/marketing";
import Events from "@/pages/events";
import Helpdesk from "@/pages/helpdesk";
import Documents from "@/pages/documents";
import Studio from "@/pages/studio";
import Knowledge from "@/pages/knowledge";
import Surveys from "@/pages/surveys";
import Fleet from "@/pages/fleet";
import Email from "@/pages/email";
import Social from "@/pages/social";
import SMS from "@/pages/sms";
import Approvals from "@/pages/approvals";
import Maintenance from "@/pages/maintenance";
import Auth from "@/pages/auth";
import NotFound from "@/pages/not-found";

function ProtectedRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/sales" component={Sales} />
        <Route path="/crm" component={CRM} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/hr" component={HR} />
        <Route path="/project" component={Project} />
        <Route path="/manufacturing" component={Manufacturing} />
        <Route path="/purchase" component={Purchase} />
        <Route path="/website" component={Website} />
        <Route path="/ecommerce" component={Ecommerce} />
        <Route path="/pos" component={POS} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/events" component={Events} />
        <Route path="/helpdesk" component={Helpdesk} />
        <Route path="/documents" component={Documents} />
        <Route path="/studio" component={Studio} />
        <Route path="/knowledge" component={Knowledge} />
        <Route path="/surveys" component={Surveys} />
        <Route path="/fleet" component={Fleet} />
        <Route path="/email" component={Email} />
        <Route path="/social" component={Social} />
        <Route path="/sms" component={SMS} />
        <Route path="/approvals" component={Approvals} />
        <Route path="/maintenance" component={Maintenance} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <ProtectedRouter />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
