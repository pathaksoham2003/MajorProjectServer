const { Client } = require("pg");
require("dotenv").config();
const client = new Client(process.env.DATABASE_URL);

(async () => {
  await client.connect();
  try {
    const results = await client.query("SELECT * FROM leads");
   
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