import { pgTable, text, serial, integer, boolean, timestamp, decimal, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  dateOfBirth: timestamp("date_of_birth"),
  height: integer("height"), // in cm
  weight: decimal("weight", { precision: 5, scale: 2 }), // in kg
  fitnessLevel: varchar("fitness_level", { length: 20 }), // beginner, intermediate, advanced
  goals: text("goals").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const foodEntries = pgTable("food_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  quantity: integer("quantity").notNull().default(1),
  mealType: varchar("meal_type", { length: 20 }).notNull(), // breakfast, lunch, dinner, snack
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Swimming workouts
export const swimmingWorkouts = pgTable("swimming_workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: integer("distance").notNull(), // in meters
  strokes: integer("strokes"),
  poolLength: integer("pool_length").default(25), // in meters
  strokeType: varchar("stroke_type", { length: 20 }), // freestyle, backstroke, etc
  calories: integer("calories"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cycling workouts
export const cyclingWorkouts = pgTable("cycling_workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: decimal("distance", { precision: 6, scale: 2 }).notNull(), // in km
  avgSpeed: decimal("avg_speed", { precision: 4, scale: 2 }), // in km/h
  maxSpeed: decimal("max_speed", { precision: 4, scale: 2 }), // in km/h
  elevation: integer("elevation"), // in meters
  calories: integer("calories"),
  route: text("route"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Running workouts
export const runningWorkouts = pgTable("running_workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: decimal("distance", { precision: 6, scale: 2 }).notNull(), // in km
  avgPace: varchar("avg_pace", { length: 10 }), // format: MM:SS per km
  maxPace: varchar("max_pace", { length: 10 }), // format: MM:SS per km
  elevation: integer("elevation"), // in meters
  calories: integer("calories"),
  route: text("route"),
  weatherConditions: varchar("weather_conditions", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Badminton sessions
export const badmintonSessions = pgTable("badminton_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes
  opponent: text("opponent"),
  matchResult: varchar("match_result", { length: 10 }), // win, loss, draw
  sets: text("sets"), // JSON string of set scores
  calories: integer("calories"),
  skillsFocused: text("skills_focused").array(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User goals and progress tracking
export const userGoals = pgTable("user_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: varchar("activity_type", { length: 20 }).notNull(), // swimming, cycling, running, badminton
  goalType: varchar("goal_type", { length: 20 }).notNull(), // distance, time, frequency, weight_loss
  targetValue: decimal("target_value", { precision: 10, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).default('0'),
  targetDate: timestamp("target_date"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Weight tracking
export const weightEntries = pgTable("weight_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weight: decimal("weight", { precision: 5, scale: 2 }).notNull(), // in kg
  bodyFatPercentage: decimal("body_fat_percentage", { precision: 4, scale: 2 }),
  muscleMass: decimal("muscle_mass", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
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
