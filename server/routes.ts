import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertFoodEntrySchema } from "../shared/schema";
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

  const httpServer = createServer(app);

  return httpServer;
}
