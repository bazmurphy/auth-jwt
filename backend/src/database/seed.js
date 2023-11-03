require("dotenv").config();

const { Client } = require("pg");

const database = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function seed() {
  try {
    console.log("Starting");
    console.log("Connecting To Database...");

    await database.connect();
    console.log("Connected To Database");

    console.log("Deleting All Tables...");
    const deleteEverything = `
    DO $$ 
    DECLARE 
        tabname text; 
    BEGIN 
        FOR tabname IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
        LOOP 
            EXECUTE 'DROP TABLE IF EXISTS ' || tabname; 
        END LOOP; 
    END $$`;
    await database.query(deleteEverything);
    console.log("Deleted All Tables");

    console.log("Creating Tables...");
    const createTables = `
    CREATE TABLE users 
    ( 
      id SERIAL PRIMARY KEY, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL
    );`;
    await database.query(createTables);
    console.log("Created Tables");
  } catch (error) {
    console.error("Seeding Database Error", error);
  } finally {
    console.log("Disconnecting From Database...");
    await database.end();
    console.log("Disconnected From Database");
    console.log("Exiting");
    process.exit(0);
  }
}

seed();
