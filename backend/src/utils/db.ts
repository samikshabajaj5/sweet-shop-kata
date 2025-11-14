import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_URL || "postgres://postgres:password@localhost:5432/sweetshop",
  {
    logging: false,
  },
);

export default db;
