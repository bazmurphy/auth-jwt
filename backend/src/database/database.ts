import { Pool } from "pg";

export const database = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function testDatabaseConnection() {
  try {
    // Acquire a client from the Pool
    const client = await database.connect();
    console.log("Connected to the Database");
    // Release the client back to the Pool
    client.release();
  } catch (error) {
    console.error("Error Connecting to the Database:", error);
  }
}

testDatabaseConnection();
