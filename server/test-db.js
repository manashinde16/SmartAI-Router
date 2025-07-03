const sql = require("./utils/db.js");
(async () => {
  const rows = await sql`SELECT NOW() AS time`;
  console.log("Database time:", rows[0].time);
})();
