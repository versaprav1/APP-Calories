import { pgTable, text, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  dateOfBirth: text("date_of_birth"),
  height: integer("height"), // in cm
  weight: real("weight"), // in kg
  fitnessLevel: text("fitness_level"), // beginner, intermediate, advanced
  goals: text("goals", { mode: "json" }).$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const foodEntries = pgTable("food_entries", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  quantity: integer("quantity").notNull().default(1),
  mealType: text("meal_type").notNull(), // breakfast, lunch, dinner, snack
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Swimming workouts
export const swimmingWorkouts = pgTable("swimming_workouts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: integer("distance").notNull(), // in meters
  strokes: integer("strokes"),
  poolLength: integer("pool_length").default(25), // in meters
  strokeType: text("stroke_type"), // freestyle, backstroke, etc
  calories: integer("calories"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cycling workouts
export const cyclingWorkouts = pgTable("cycling_workouts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: real("distance").notNull(), // in km
  avgSpeed: real("avg_speed"), // in km/h
  maxSpeed: real("max_speed"), // in km/h
  elevation: integer("elevation"), // in meters
  calories: integer("calories"),
  route: text("route"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Running workouts
export const runningWorkouts = pgTable("running_workouts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: real("distance").notNull(), // in km
  avgPace: text("avg_pace"), // format: MM:SS per km
  maxPace: text("max_pace"), // format: MM:SS per km
  elevation: integer("elevation"), // in meters
  calories: integer("calories"),
  route: text("route"),
  weatherConditions: text("weather_conditions"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Badminton sessions
export const badmintonSessions = pgTable("badminton_sessions", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  opponent: text("opponent"),
  matchResult: text("match_result"), // win, loss, draw
  sets: text("sets", { mode: 'json' }), // Store as JSON
  calories: integer("calories"),
  skillsFocused: text("skills_focused", { mode: 'json' }), // Store as JSON
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User goals and progress tracking
export const userGoals = pgTable("user_goals", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(), // swimming, cycling, running, badminton
  goalType: text("goal_type").notNull(), // distance, time, frequency, weight_loss
  targetValue: real("target_value").notNull(),
  currentValue: real("current_value"),
  targetDate: text("target_date"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Weight tracking
export const weightEntries = pgTable("weight_entries", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: integer("user_id").notNull(),
  weight: real("weight").notNull(), // in kg
  bodyFatPercentage: real("body_fat_percentage"),
  muscleMass: real("muscle_mass"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas (same as SQLite version)
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateUserProfileSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  dateOfBirth: true,
  height: true,
  weight: true,
  fitnessLevel: true,
  goals: true,
});

export const insertFoodEntrySchema = createInsertSchema(foodEntries).pick({
  name: true,
  calories: true,
  quantity: true,
  mealType: true,
  userId: true,
});

export const insertSwimmingWorkoutSchema = createInsertSchema(swimmingWorkouts).pick({
  userId: true,
  duration: true,
  distance: true,
  strokes: true,
  poolLength: true,
  strokeType: true,
  calories: true,
  notes: true,
});

export const insertCyclingWorkoutSchema = createInsertSchema(cyclingWorkouts).pick({
  userId: true,
  duration: true,
  distance: true,
  avgSpeed: true,
  maxSpeed: true,
  elevation: true,
  calories: true,
  route: true,
  notes: true,
});

export const insertRunningWorkoutSchema = createInsertSchema(runningWorkouts).pick({
  userId: true,
  duration: true,
  distance: true,
  avgPace: true,
  maxPace: true,
  elevation: true,
  calories: true,
  route: true,
  weatherConditions: true,
  notes: true,
});

export const insertBadmintonSessionSchema = createInsertSchema(badmintonSessions).pick({
  userId: true,
  duration: true,
  opponent: true,
  matchResult: true,
  sets: true,
  calories: true,
  skillsFocused: true,
  notes: true,
});

export const insertUserGoalSchema = createInsertSchema(userGoals).pick({
  userId: true,
  activityType: true,
  goalType: true,
  targetValue: true,
  targetDate: true,
});

export const insertWeightEntrySchema = createInsertSchema(weightEntries).pick({
  userId: true,
  weight: true,
  bodyFatPercentage: true,
  muscleMass: true,
  notes: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type User = typeof users.$inferSelect;

export type InsertFoodEntry = z.infer<typeof insertFoodEntrySchema>;
export type FoodEntry = typeof foodEntries.$inferSelect;

export type InsertSwimmingWorkout = z.infer<typeof insertSwimmingWorkoutSchema>;
export type SwimmingWorkout = typeof swimmingWorkouts.$inferSelect;

export type InsertCyclingWorkout = z.infer<typeof insertCyclingWorkoutSchema>;
export type CyclingWorkout = typeof cyclingWorkouts.$inferSelect;

export type InsertRunningWorkout = z.infer<typeof insertRunningWorkoutSchema>;
export type RunningWorkout = typeof runningWorkouts.$inferSelect;

export type InsertBadmintonSession = z.infer<typeof insertBadmintonSessionSchema>;
export type BadmintonSession = typeof badmintonSessions.$inferSelect;

export type InsertUserGoal = z.infer<typeof insertUserGoalSchema>;
export type UserGoal = typeof userGoals.$inferSelect;

export type InsertWeightEntry = z.infer<typeof insertWeightEntrySchema>;
export type WeightEntry = typeof weightEntries.$inferSelect;
