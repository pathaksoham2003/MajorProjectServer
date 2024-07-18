const { Client } = require("pg");
require("dotenv").config();
const client = new Client(process.env.DATABASE_URL);
/*
CREATE TABLE USERS_TABLE (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  picture VARCHAR(255),
  password VARCHAR(40),
  google_auth BOOLEAN DEFAULT FALSE,
);
*/
/*
CREATE TABLE ADDRESSES_TABLE (
      address_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES USERS_TABLE(user_id),
      street_address VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      postal_code VARCHAR(20)
    );
*/
/*
CREATE TABLE PRODUCTS_TABLE (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    rating INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    mainImage TEXT NOT NULL,
    exImg1 TEXT NOT NULL,
    exImg2 TEXT NOT NULL
);
*/
(async () => {
    await client.connect();
  try {
    const results = await client.query(`SELECT * FROM PRODUCTS_TABLE 
    `);
    console.log("Database Connection");
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    // client.end();
    // console.log("DISCONNECTED DATABASE")
  }
})();
module.exports = client;