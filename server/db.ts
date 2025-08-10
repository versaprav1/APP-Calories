import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "../shared/schema";
import fs from 'node:fs';      // <-- ADD THIS LINE
import path from 'node:path';  // <-- ADD THIS LINE

if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('sqlite://')) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// This path is correct, e.g., /home/user/APP-Calories/.sqlite/db.sqlite
const dbPath = process.env.DATABASE_URL.replace('sqlite://', '');

// --- START: ADDED CODE ---
// Get the directory of the database file, e.g., /home/user/APP-Calories/.sqlite
const dbDir = path.dirname(dbPath);

// Check if the directory exists, and if not, create it
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Database directory created at: ${dbDir}`);
}
// --- END: ADDED CODE ---

// This will now succeed because the directory has been created
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });