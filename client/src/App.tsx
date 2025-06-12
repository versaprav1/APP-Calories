import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Calories } from "@/pages/Calories";
import Onboarding from "@/pages/Onboarding";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import FoodTracking from "@/pages/FoodTracking";
import NutritionPlans from "@/pages/NutritionPlans";
import FitnessGoals from "@/pages/FitnessGoals";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Onboarding} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/calories" component={Calories} />
      <Route path="/food-tracking" component={FoodTracking} />
      <Route path="/nutrition-plans" component={NutritionPlans} />
      <Route path="/fitness-goals" component={FitnessGoals} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
