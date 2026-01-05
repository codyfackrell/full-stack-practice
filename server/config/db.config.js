import mysql from "mysql2/promise";
import "dotenv/config";

let pool = mysql.createPool({
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected!");
    connection.release();
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });

export default pool;
