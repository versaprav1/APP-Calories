import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const foodEntries = pgTable("food_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  quantity: integer("quantity").notNull().default(1),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFoodEntrySchema = createInsertSchema(foodEntries).pick({
  name: true,
  calories: true,
  quantity: true,
  userId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFoodEntry = z.infer<typeof insertFoodEntrySchema>;
export type FoodEntry = typeof foodEntries.$inferSelect;
