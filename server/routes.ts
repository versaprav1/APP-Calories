import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertFoodEntrySchema,
  updateUserProfileSchema,
  insertSwimmingWorkoutSchema,
  insertCyclingWorkoutSchema,
  insertRunningWorkoutSchema,
  insertBadmintonSessionSchema,
  insertUserGoalSchema,
  insertWeightEntrySchema
} from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get food entries
  app.get("/api/food-entries", async (req, res) => {
    try {
      // For demo purposes, using userId 1. In real app, get from session/auth
      const foodEntries = await storage.getFoodEntries(1);
      res.json(foodEntries);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Add food entry
  app.post("/api/food-entries", async (req, res) => {
    try {
      const foodData = insertFoodEntrySchema.parse({
        ...req.body,
        userId: 1 // For demo purposes, using userId 1
      });
      
      const foodEntry = await storage.createFoodEntry(foodData);
      res.json(foodEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete food entry
  app.delete("/api/food-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFoodEntry(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Don't return password
      const { password, ...userProfile } = user;
      res.json(userProfile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user profile
  app.put("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const profileData = updateUserProfileSchema.parse(req.body);
      const user = await storage.updateUserProfile(id, profileData);
      const { password, ...userProfile } = user;
      res.json(userProfile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Swimming workouts
  app.get("/api/swimming-workouts/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const workouts = await storage.getSwimmingWorkouts(userId);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/swimming-workouts", async (req, res) => {
    try {
      const workoutData = insertSwimmingWorkoutSchema.parse(req.body);
      const workout = await storage.createSwimmingWorkout(workoutData);
      res.json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/swimming-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSwimmingWorkout(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Cycling workouts
  app.get("/api/cycling-workouts/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const workouts = await storage.getCyclingWorkouts(userId);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/cycling-workouts", async (req, res) => {
    try {
      const workoutData = insertCyclingWorkoutSchema.parse(req.body);
      const workout = await storage.createCyclingWorkout(workoutData);
      res.json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/cycling-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCyclingWorkout(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Running workouts
  app.get("/api/running-workouts/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const workouts = await storage.getRunningWorkouts(userId);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/running-workouts", async (req, res) => {
    try {
      const workoutData = insertRunningWorkoutSchema.parse(req.body);
      const workout = await storage.createRunningWorkout(workoutData);
      res.json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/running-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteRunningWorkout(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Badminton sessions
  app.get("/api/badminton-sessions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await storage.getBadmintonSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/badminton-sessions", async (req, res) => {
    try {
      const sessionData = insertBadmintonSessionSchema.parse(req.body);
      const session = await storage.createBadmintonSession(sessionData);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/badminton-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBadmintonSession(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User goals
  app.get("/api/goals/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const goals = await storage.getUserGoals(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const goalData = insertUserGoalSchema.parse(req.body);
      const goal = await storage.createUserGoal(goalData);
      res.json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const goal = await storage.updateUserGoal(id, updates);
      res.json(goal);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUserGoal(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Weight entries
  app.get("/api/weight-entries/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const entries = await storage.getWeightEntries(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/weight-entries", async (req, res) => {
    try {
      const entryData = insertWeightEntrySchema.parse(req.body);
      const entry = await storage.createWeightEntry(entryData);
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/weight-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteWeightEntry(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/workout-stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { activityType, startDate, endDate } = req.query;
      const stats = await storage.getWorkoutStats(
        userId, 
        activityType as string, 
        startDate as string, 
        endDate as string
      );
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/analytics/calorie-stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { startDate, endDate } = req.query;
      const stats = await storage.getCalorieStats(
        userId,
        startDate as string,
        endDate as string
      );
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
