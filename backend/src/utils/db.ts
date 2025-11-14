import { Sequelize } from "sequelize";

// const db = new Sequelize(process.env.DB_URL as string, {
//   logging: false,
// });

const db = new Sequelize({
  dialect: "sqlite",
  storage: "sweetshop.sqlite",
  logging: false,
});

export default db;
