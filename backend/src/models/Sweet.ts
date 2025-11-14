import { DataTypes, Model } from "sequelize";
import db from "../utils/db";

class Sweet extends Model {}

Sweet.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize: db, modelName: "Sweet" },
);

export default Sweet;
