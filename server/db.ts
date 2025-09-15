import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

// Use SQLite database instead of PostgreSQL
const sqlite = new Database('./erp.db');
export const db = drizzle({ client: sqlite, schema });
