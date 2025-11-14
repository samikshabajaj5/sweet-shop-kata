import dotenv from "dotenv";
import app from "./app";
import db from "./utils/db";

dotenv.config();

const PORT = process.env.PORT || 4000;

// setup required when using sqllite
// for postgress normally listen to the port
db.sync().then(() => {
  console.log("SQLite DB synced");
  app.listen(PORT, () => console.log("Server running on port 4000"));
});
