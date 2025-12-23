//db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (!globalThis._pgPool) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false }, // enable if your DB requires SSL
  });
  globalThis._pgPool = pool;
} else {
  pool = globalThis._pgPool;
}

export default pool;
