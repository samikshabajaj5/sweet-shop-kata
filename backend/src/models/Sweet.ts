import { DataTypes, Model } from "sequelize";
import db from "../utils/db";

class Sweet extends Model {
  declare id: number;
  declare name: string;
  declare category: string;
  declare price: number;
  declare quantity: number;
  declare imageUrl: string | null;
}

Sweet.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "Sweet" },
);

export default Sweet;
