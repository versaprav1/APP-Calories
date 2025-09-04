import fs from 'node:fs';
import path from 'node:path';

// Determine database type and create appropriate connection
const databaseUrl = process.env.DATABASE_URL || 'sqlite://./.sqlite/db.sqlite';
const isPostgres = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://');

let db: any;

if (isPostgres) {
  // PostgreSQL for production (Render)
  const { drizzle } = await import('drizzle-orm/postgres-js');
  const postgres = await import('postgres');
  const schema = await import('../shared/schema-postgres');
  
  const sql = postgres.default(databaseUrl);
  db = drizzle(sql, { schema });
  console.log('Connected to PostgreSQL database');
} else {
  // SQLite for development
  const Database = await import('better-sqlite3');
  const { drizzle } = await import('drizzle-orm/better-sqlite3');
  const schema = await import('../shared/schema');
  
  const defaultDbPath = path.resolve(process.cwd(), '.sqlite', 'db.sqlite');
  const dbPath = databaseUrl.replace('sqlite://', '');
  const dbDir = path.dirname(dbPath);

  // Check if the directory exists, and if not, create it
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`Database directory created at: ${dbDir}`);
  }

  const sqlite = new Database.default(dbPath);
  db = drizzle(sqlite, { schema });
  console.log('Connected to SQLite database');
}

export { db };