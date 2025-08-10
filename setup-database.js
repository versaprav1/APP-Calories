import Database from 'better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'; // Import necessary types from drizzle-orm

const dbPath = '/home/user/APP-Calories/.sqlite/db.sqlite';

try {
  console.log(`Opening database at: ${dbPath}`);
  const db = new Database(dbPath);

  // Drop the users table if it exists
  console.log('Dropping users table if it exists...');
  db.exec('DROP TABLE IF EXISTS users;');
  console.log('Users table dropped if it existed.');

  // Create the users table with the full schema based on shared/schema.ts
  console.log('Creating users table with full schema...');
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      dateOfBirth TEXT,
      height INTEGER,
      weight REAL,
      fitnessLevel TEXT,
      goals TEXT,
      createdAt INTEGER
    );
  `);
  console.log('Users table created with full schema.');

  db.close();
  console.log('Database connection closed.');

} catch (error) {
  console.error('Error performing database setup:', error);
}