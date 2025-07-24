const { Pool } = require('pg');

console.log("Connecting to DB:", process.env.DATABASE_URL); // ✅ Debug print

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
