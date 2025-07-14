import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "../shared/schema";
 
if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('sqlite://')) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const dbPath = process.env.DATABASE_URL.replace('sqlite://', '');
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });