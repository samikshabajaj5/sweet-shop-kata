import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB_URL as string, {
  logging: false,
});

export default db;
