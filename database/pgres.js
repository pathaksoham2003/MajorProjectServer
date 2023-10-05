const { Client } = require("pg");
require("dotenv").config();
const client = new Client(process.env.DATABASE_URL);
/*
CREATE TABLE USERS_TABLE (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  google_id VARCHAR(35) NOT NULL UNIQUE,
  picture VARCHAR(255),
  address VARCHAR(255)
);
*/
(async () => {
  await client.connect();
  try {
    const results = await client.query("SELECT * FROM USERS_TABLE");
    console.log(results.rows);
    console.log("Database Connection");
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
    console.log("DISCONNECTED DATABASE")
  }
})();
module.exports = client;