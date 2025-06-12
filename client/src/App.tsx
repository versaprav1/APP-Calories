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
import Swimming from "@/pages/Swimming";
import Cycling from "@/pages/Cycling";
import Running from "@/pages/Running";
import Badminton from "@/pages/Badminton";
import CalorieControl from "@/pages/CalorieControl";
import WeightControl from "@/pages/WeightControl";
import ProfileSetup from "@/pages/ProfileSetup";
import Account from "@/pages/Account";
import Activity from "@/pages/Activity";
import Resources from "@/pages/Resources";
import DashboardSetup from "@/pages/DashboardSetup";
import AddEditEmail from "@/pages/AddEditEmail";
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import Devices from "@/pages/Devices";
import Reminders from "@/pages/Reminders";
import FAQ from "@/pages/FAQ";
import Data from "@/pages/Data";
import DailyActivities from "@/pages/DailyActivities";
import WeeklySummary from "@/pages/WeeklySummary";
import GoalsProgress from "@/pages/GoalsProgress";
import WorkoutHistory from "@/pages/WorkoutHistory";
import PerformanceAnalytics from "@/pages/PerformanceAnalytics";
import ActivitySettings from "@/pages/ActivitySettings";

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
      <Route path="/swimming" component={Swimming} />
      <Route path="/cycling" component={Cycling} />
      <Route path="/running" component={Running} />
      <Route path="/badminton" component={Badminton} />
      <Route path="/calorie-control" component={CalorieControl} />
      <Route path="/weight-control" component={WeightControl} />
      <Route path="/profile-setup" component={ProfileSetup} />
      <Route path="/account" component={Account} />
      <Route path="/activity" component={Activity} />
      <Route path="/resources" component={Resources} />
      <Route path="/dashboard-setup" component={DashboardSetup} />
      <Route path="/add-edit-email" component={AddEditEmail} />
      <Route path="/help" component={Help} />
      <Route path="/settings" component={Settings} />
      <Route path="/devices" component={Devices} />
      <Route path="/reminders" component={Reminders} />
      <Route path="/faq" component={FAQ} />
      <Route path="/data" component={Data} />
      <Route path="/daily-activities" component={DailyActivities} />
      <Route path="/weekly-summary" component={WeeklySummary} />
      <Route path="/goals-progress" component={GoalsProgress} />
      <Route path="/workout-history" component={WorkoutHistory} />
      <Route path="/performance-analytics" component={PerformanceAnalytics} />
      <Route path="/activity-settings" component={ActivitySettings} />
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
