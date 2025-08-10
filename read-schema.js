import Database from 'better-sqlite3';

const dbPath = '/home/user/APP-Calories/.sqlite/db.sqlite';
let db;

console.log("Attempting to access database at:", dbPath);
try {
  db = new Database(dbPath);
  const schema = db.prepare("SELECT sql FROM sqlite_master WHERE name = 'users'").get();
  if (schema) {
    console.log("Schema for 'users' table:");
    console.log(schema.sql);
  } else {
    console.log("Table 'users' not found.");
  }
} catch (err) {
  console.error("Error accessing database:", err);
} finally {
  if (db) {
    db.close();
    console.log("Database connection closed.");
  }
}