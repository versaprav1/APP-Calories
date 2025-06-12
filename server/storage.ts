import { users, foodEntries, type User, type InsertUser, type FoodEntry, type InsertFoodEntry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFoodEntries(userId: number): Promise<FoodEntry[]>;
  createFoodEntry(foodEntry: InsertFoodEntry): Promise<FoodEntry>;
  deleteFoodEntry(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getFoodEntries(userId: number): Promise<FoodEntry[]> {
    const entries = await db.select().from(foodEntries).where(eq(foodEntries.userId, userId));
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
}

export const storage = new DatabaseStorage();
