import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL || "sqlite://./.sqlite/db.sqlite";

// Determine dialect based on database URL
const isPostgres = databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: isPostgres ? "postgresql" : "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});
