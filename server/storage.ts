import {
  users,
  foodEntries,
  swimmingWorkouts,
  cyclingWorkouts,
  runningWorkouts,
  badmintonSessions,
  userGoals,
  weightEntries,
  type User,
  type InsertUser,
  type UpdateUserProfile,
  type FoodEntry,
  type InsertFoodEntry,
  type SwimmingWorkout,
  type InsertSwimmingWorkout,
  type CyclingWorkout,
  type InsertCyclingWorkout,
  type RunningWorkout,
  type InsertRunningWorkout,
  type BadmintonSession,
  type InsertBadmintonSession,
  type UserGoal,
  type InsertUserGoal,
  type WeightEntry,
  type InsertWeightEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: number, profile: UpdateUserProfile): Promise<User>;
  
  // Food operations
  getFoodEntries(userId: number): Promise<FoodEntry[]>;
  getFoodEntriesByDate(userId: number, date: string): Promise<FoodEntry[]>;
  createFoodEntry(foodEntry: InsertFoodEntry): Promise<FoodEntry>;
  deleteFoodEntry(id: number): Promise<void>;
  
  // Swimming operations
  getSwimmingWorkouts(userId: number): Promise<SwimmingWorkout[]>;
  createSwimmingWorkout(workout: InsertSwimmingWorkout): Promise<SwimmingWorkout>;
  deleteSwimmingWorkout(id: number): Promise<void>;
  
  // Cycling operations
  getCyclingWorkouts(userId: number): Promise<CyclingWorkout[]>;
  createCyclingWorkout(workout: InsertCyclingWorkout): Promise<CyclingWorkout>;
  deleteCyclingWorkout(id: number): Promise<void>;
  
  // Running operations
  getRunningWorkouts(userId: number): Promise<RunningWorkout[]>;
  createRunningWorkout(workout: InsertRunningWorkout): Promise<RunningWorkout>;
  deleteRunningWorkout(id: number): Promise<void>;
  
  // Badminton operations
  getBadmintonSessions(userId: number): Promise<BadmintonSession[]>;
  createBadmintonSession(session: InsertBadmintonSession): Promise<BadmintonSession>;
  deleteBadmintonSession(id: number): Promise<void>;
  
  // Goals operations
  getUserGoals(userId: number): Promise<UserGoal[]>;
  createUserGoal(goal: InsertUserGoal): Promise<UserGoal>;
  updateUserGoal(id: number, updates: Partial<UserGoal>): Promise<UserGoal>;
  deleteUserGoal(id: number): Promise<void>;
  
  // Weight tracking operations
  getWeightEntries(userId: number): Promise<WeightEntry[]>;
  createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry>;
  deleteWeightEntry(id: number): Promise<void>;
  
  // Analytics operations
  getWorkoutStats(userId: number, activityType: string, startDate?: string, endDate?: string): Promise<any>;
  getCalorieStats(userId: number, startDate?: string, endDate?: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
    } catch (error) {
      console.error(error);
    }
    return user;
  }

  async updateUserProfile(id: number, profile: UpdateUserProfile): Promise<User> {
    const [user] = await db
      .update(users)
      .set(profile)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Food operations
  async getFoodEntries(userId: number): Promise<FoodEntry[]> {
    const entries = await db.select().from(foodEntries)
      .where(eq(foodEntries.userId, userId))
      .orderBy(desc(foodEntries.createdAt));
    return entries;
  }

  async getFoodEntriesByDate(userId: number, date: string): Promise<FoodEntry[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    
    const entries = await db.select().from(foodEntries)
      .where(
        and(
          eq(foodEntries.userId, userId),
          gte(foodEntries.createdAt, startDate),
          lte(foodEntries.createdAt, endDate)
        )
      )
      .orderBy(desc(foodEntries.createdAt));
    return entries;
  }

  async createFoodEntry(insertFoodEntry: InsertFoodEntry): Promise<FoodEntry> {
    const [entry] = await db
      .insert(foodEntries)
      .values(insertFoodEntry)
      .returning();
    return entry;
  }

  async deleteFoodEntry(id: number): Promise<void> {
    await db.delete(foodEntries).where(eq(foodEntries.id, id));
  }

  // Swimming operations
  async getSwimmingWorkouts(userId: number): Promise<SwimmingWorkout[]> {
    const workouts = await db.select().from(swimmingWorkouts)
      .where(eq(swimmingWorkouts.userId, userId))
      .orderBy(desc(swimmingWorkouts.createdAt));
    return workouts;
  }

  async createSwimmingWorkout(workout: InsertSwimmingWorkout): Promise<SwimmingWorkout> {
    const [newWorkout] = await db
      .insert(swimmingWorkouts)
      .values(workout)
      .returning();
    return newWorkout;
  }

  async deleteSwimmingWorkout(id: number): Promise<void> {
    await db.delete(swimmingWorkouts).where(eq(swimmingWorkouts.id, id));
  }

  // Cycling operations
  async getCyclingWorkouts(userId: number): Promise<CyclingWorkout[]> {
    const workouts = await db.select().from(cyclingWorkouts)
      .where(eq(cyclingWorkouts.userId, userId))
      .orderBy(desc(cyclingWorkouts.createdAt));
    return workouts;
  }

  async createCyclingWorkout(workout: InsertCyclingWorkout): Promise<CyclingWorkout> {
    const [newWorkout] = await db
      .insert(cyclingWorkouts)
      .values(workout)
      .returning();
    return newWorkout;
  }

  async deleteCyclingWorkout(id: number): Promise<void> {
    await db.delete(cyclingWorkouts).where(eq(cyclingWorkouts.id, id));
  }

  // Running operations
  async getRunningWorkouts(userId: number): Promise<RunningWorkout[]> {
    const workouts = await db.select().from(runningWorkouts)
      .where(eq(runningWorkouts.userId, userId))
      .orderBy(desc(runningWorkouts.createdAt));
    return workouts;
  }

  async createRunningWorkout(workout: InsertRunningWorkout): Promise<RunningWorkout> {
    const [newWorkout] = await db
      .insert(runningWorkouts)
      .values(workout)
      .returning();
    return newWorkout;
  }

  async deleteRunningWorkout(id: number): Promise<void> {
    await db.delete(runningWorkouts).where(eq(runningWorkouts.id, id));
  }

  // Badminton operations
  async getBadmintonSessions(userId: number): Promise<BadmintonSession[]> {
    const sessions = await db.select().from(badmintonSessions)
      .where(eq(badmintonSessions.userId, userId))
      .orderBy(desc(badmintonSessions.createdAt));
    return sessions;
  }

  async createBadmintonSession(session: InsertBadmintonSession): Promise<BadmintonSession> {
    const [newSession] = await db
      .insert(badmintonSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async deleteBadmintonSession(id: number): Promise<void> {
    await db.delete(badmintonSessions).where(eq(badmintonSessions.id, id));
  }

  // Goals operations
  async getUserGoals(userId: number): Promise<UserGoal[]> {
    const goals = await db.select().from(userGoals)
      .where(eq(userGoals.userId, userId))
      .orderBy(desc(userGoals.createdAt));
    return goals;
  }

  async createUserGoal(goal: InsertUserGoal): Promise<UserGoal> {
    const [newGoal] = await db
      .insert(userGoals)
      .values(goal)
      .returning();
    return newGoal;
  }

  async updateUserGoal(id: number, updates: Partial<UserGoal>): Promise<UserGoal> {
    const [updatedGoal] = await db
      .update(userGoals)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userGoals.id, id))
      .returning();
    return updatedGoal;
  }

  async deleteUserGoal(id: number): Promise<void> {
    await db.delete(userGoals).where(eq(userGoals.id, id));
  }

  // Weight tracking operations
  async getWeightEntries(userId: number): Promise<WeightEntry[]> {
    const entries = await db.select().from(weightEntries)
      .where(eq(weightEntries.userId, userId))
      .orderBy(desc(weightEntries.createdAt));
    return entries;
  }

  async createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry> {
    const [newEntry] = await db
      .insert(weightEntries)
      .values(entry)
      .returning();
    return newEntry;
  }

  async deleteWeightEntry(id: number): Promise<void> {
    await db.delete(weightEntries).where(eq(weightEntries.id, id));
  }

  // Analytics operations
  async getWorkoutStats(userId: number, activityType: string, startDate?: string, endDate?: string): Promise<any> {
    let table;
    switch (activityType) {
      case 'swimming':
        table = swimmingWorkouts;
        break;
      case 'cycling':
        table = cyclingWorkouts;
        break;
      case 'running':
        table = runningWorkouts;
        break;
      case 'badminton':
        table = badmintonSessions;
        break;
      default:
        return { totalWorkouts: 0, totalDuration: 0, totalCalories: 0 };
    }

    let whereClause = eq(table.userId, userId);
    
    if (startDate && endDate) {
      whereClause = and(
        whereClause,
        gte(table.createdAt, new Date(startDate)),
        lte(table.createdAt, new Date(endDate))
      );
    }

    const stats = await db.select({
      totalWorkouts: sql<number>`count(*)`,
      totalDuration: sql<number>`sum(${table.duration})`,
      totalCalories: sql<number>`sum(${table.calories})`,
    }).from(table).where(whereClause);

    return stats[0] || { totalWorkouts: 0, totalDuration: 0, totalCalories: 0 };
  }

  async getCalorieStats(userId: number, startDate?: string, endDate?: string): Promise<any> {
    let whereClause = eq(foodEntries.userId, userId);
    
    if (startDate && endDate) {
      whereClause = and(
        whereClause,
        gte(foodEntries.createdAt, new Date(startDate)),
        lte(foodEntries.createdAt, new Date(endDate))
      );
    }

    const stats = await db.select({
      totalEntries: sql<number>`count(*)`,
      totalCalories: sql<number>`sum(${foodEntries.calories} * ${foodEntries.quantity})`,
      avgCaloriesPerDay: sql<number>`avg(${foodEntries.calories} * ${foodEntries.quantity})`,
    }).from(foodEntries).where(whereClause);

    return stats[0] || { totalEntries: 0, totalCalories: 0, avgCaloriesPerDay: 0 };
  }
}

export const storage = new DatabaseStorage();
