// backend/db.js

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for connecting to Render-hosted PostgreSQL
  },
});

module.exports = pool;
